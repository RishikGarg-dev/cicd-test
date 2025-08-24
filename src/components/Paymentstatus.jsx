import React from "react";
import Sidebar from "./SideBar";

const PaymentStatus = ({ activeSection, onSectionChange }) => {
  return (
    <div className="flex">
      <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-6">Payment Status</h2>

          <div className="text-center py-12">
            <p className="text-gray-500">Payment status information will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus
