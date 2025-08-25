import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "my-rentals", label: "My Rentals", path: "/myrentals" },
    { id: "rentals-history", label: "Rentals History", path: "/rentalshistory" },
    { id: "lease-documents", label: "Lease Documents", path: "/leasedocuments" },
    { id: "payment-status", label: "Payment Status", path: "/paymentstatus" },
    { id: "maintenance-issue", label: "Raise Maintenance Issue", path: "/maintenanceissue" },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className="sm:hidden p-4 bg-gray-300 rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-icons">menu</span>
      </button>

      <aside
        className={`w-full sm:w-64 bg-gray-300 h-[calc(100vh-4rem)] p-4 sm:p-6 flex-shrink-0 ${
          isOpen ? "block" : "hidden sm:block"
        }`}
      >
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => onSectionChange(item.id)}
              className={`w-full block text-left px-4 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

