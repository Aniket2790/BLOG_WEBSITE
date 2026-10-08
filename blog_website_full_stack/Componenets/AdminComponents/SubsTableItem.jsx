import React from "react";

const SubsTableItem = ({ email, mongoId, deleteEmail, date }) => {
  const emailDate = new Date(date);

  return (
    <tr className="hover:bg-indigo-50/40 transition-colors">
      <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap text-left">
        {email ? email : "No Email"}
      </th>
      <td className="px-6 py-4 hidden sm:table-cell text-slate-500">
        {emailDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={() => deleteEmail(mongoId)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default SubsTableItem;
