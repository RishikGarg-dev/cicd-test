import React from "react";
import Sidebar from "./SideBar";

const PaymentStatus = ({ activeSection, onSectionChange }) => {
  const transactions = [
    { id: "AEDXES21ex", date: "03-03-2029", status: "Completed" },
    { id: "AEDXES21ex", date: "03-03-2029", status: "Pending" },
    { id: "AEDXES21ex", date: "03-03-2029", status: "Completed" },
    { id: "AEDXES21ex", date: "03-03-2029", status: "Pending" },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar section (stacked on mobile and side-by-side on tablets and above) */}
      <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />

      <section className="flex-1 bg-gray-100 p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-6">Payment Status</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Transaction ID</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-700">{transaction.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{transaction.date}</td>
                    <td className={`py-3 px-4 text-sm ${transaction.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentStatus;
