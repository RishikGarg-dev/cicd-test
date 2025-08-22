import React from "react";
import { Link } from "react-router-dom";

const MaintenanceRequestsComp = () => {
  const requests = [
    {
      title: "Water Request",
      description: "Leak in kitchen pipes",
      raisedBy: "C1",
      status: "Resolved",
    },
    {
      title: "Water Request",
      description: "Leak in kitchen pipes",
      raisedBy: "C1",
      status: "Open",
    },
    {
      title: "Water Request",
      description: "Leak in kitchen pipes",
      raisedBy: "C1",
      status: "Resolved",
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10">
      <div className="w-full max-w-3xl px-6">
        <h2 className="text-center font-bold italic text-2xl mb-8">
          Maintenance Requests
        </h2>

        {requests.map((req, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 mb-6 rounded-xl shadow-md"
          >
            <h3 className="font-bold text-lg">{req.title}</h3>
            <p className="text-sm text-gray-700">{req.description}</p>
            <p className="text-xs text-gray-500">Raised by {req.raisedBy}</p>

            {/* Status clickable */}
            <Link
              to={`/status/${req.status.toLowerCase()}`}
              className={`inline-block mt-3 text-sm font-semibold underline cursor-pointer ${
                req.status.toLowerCase() === "resolved"
                  ? "text-green-600"
                  : req.status.toLowerCase() === "open"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {req.status}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceRequestsComp;
