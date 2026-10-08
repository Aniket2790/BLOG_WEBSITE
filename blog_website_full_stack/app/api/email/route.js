import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function POST(request) {
  try {
    // Always connect inside handler
    await ConnectDB();

    const formData = await request.formData();
    const email = formData.get("email");

    if (!email) {
      return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
    }

    await EmailModel.create({ email });
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (err) {
    console.error("POST /api/email error:", err);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(request){
    const { error } = await requireAdmin(request);
    if (error) return error;

    await ConnectDB();
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}

export async function DELETE(request){
    const { error } = await requireAdmin(request);
    if (error) return error;

    await ConnectDB();
    const id = await request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);

    return NextResponse.json({success:true,msg:"Email Deleted"})
}
