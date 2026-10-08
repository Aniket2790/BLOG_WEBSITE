"use client";
import AdminPageHeader from "@/Componenets/AdminComponents/AdminPageHeader";
import SubsTableItem from "@/Componenets/AdminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails || []);
  };

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete("/api/email", {
      params: { id: mongoId },
    });

    if (response.data.success) {
      toast.success(response.data.msg);
      fetchEmails();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Subscriptions"
        description="Emails collected from the homepage newsletter form."
      />

      <div className="admin-card overflow-hidden">
        <div className="max-h-[70vh] overflow-auto scrollbar-hide">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th scope="col" className="px-6 py-4">
                  Email
                </th>
                <th scope="col" className="hidden sm:table-cell px-6 py-4">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {emails.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-16 text-center text-slate-500">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                emails.map((item) => (
                  <SubsTableItem
                    key={item._id}
                    mongoId={item._id}
                    email={item.email}
                    date={item.date}
                    deleteEmail={deleteEmail}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
