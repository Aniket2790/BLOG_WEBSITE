import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

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
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);

    return NextResponse.json({success:true,msg:"Email Deleted"})
}


// export async function GET(request) {
//   try {
//     await ConnectDB(); // ✅ Always connect to DB before querying

//     const emails = await EmailModel.find({}).sort({ date: -1 }); // Sort newest first (optional)
    
//     return NextResponse.json({ success: true, emails });
//   } catch (error) {
//     console.error("Error fetching emails:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch emails" },
//       { status: 500 }
//     );
//   }
// }