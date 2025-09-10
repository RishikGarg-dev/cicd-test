import React from "react";
import { FaHome, FaBuilding, FaFileAlt, FaPen, FaTimes } from "react-icons/fa";

const LeaseDocuments = ({ activeSection, onSectionChange }) => {
  const documentTypes = [
    { type: "residential", title: "Residential Lease" },
    { type: "commercial", title: "Commercial Lease" },
    { type: "document", title: "Document" },
    { type: "amendments", title: "Office Amendments" },
    { type: "cancellations", title: "Cancellations" }
  ];

  const getIcon = (type) => {
    switch (type) {
      case "residential":
        return <FaHome className="w-12 h-12 text-gray-600" />;
      case "commercial":
        return <FaBuilding className="w-12 h-12 text-gray-600" />;
      case "document":
        return <FaFileAlt className="w-12 h-12 text-gray-600" />;
      case "amendments":
        return <FaPen className="w-12 h-12 text-gray-600" />;
      case "cancellations":
        return <FaTimes className="w-12 h-12 text-gray-600" />;
      default:
        return <FaFileAlt className="w-12 h-12 text-gray-600" />;
    }
  };

  return (
    <section className="flex flex-col sm:flex-row">

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border-2 border-blue-500">
          <h2 className="text-lg sm:text-xl font-medium mb-6">Documents</h2>

          {/* Document Types Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {documentTypes.map((doc, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  {getIcon(doc.type)}
                </div>
                <h3 className="font-medium text-gray-900">{doc.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaseDocuments;
