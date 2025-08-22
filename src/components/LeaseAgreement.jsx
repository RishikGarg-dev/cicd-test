import React from "react";

const leaseAgreements = [
  {
    property: "Urban Tuplies",
    tenant: "T1",
    contractId: "C-1024",
    leaseStart: "1-Jan-2024",
    leaseEnd: "1-Jan-2026",
    organisation: "Urban Tuplies",
  },
  {
    property: "Urban Tuplies",
    tenant: "T1",
    contractId: "C-1024",
    leaseStart: "1-Jan-2024",
    leaseEnd: "1-Jan-2026",
    organisation: "Urban Tuplies",
  },
  {
    property: "Urban Tuplies",
    tenant: "T1",
    contractId: "C-1024",
    leaseStart: "1-Jan-2024",
    leaseEnd: "1-Jan-2026",
    organisation: "Urban Tuplies",
  },
];

export default function LeaseAgreementsComp() {
  return (
    <div className="p-6">
      <h2 className="text-center font-bold italic text-lg mb-6">
        LEASE AGREEMENTS
      </h2>

      <div className="space-y-6">
        {leaseAgreements.map((lease, index) => (
          <div
            key={index}
            className="w-full border rounded-lg p-6 bg-white shadow-sm"
          >
            <p>
              <span className="font-semibold">Property name:</span>{" "}
              {lease.property}
            </p>
            <p>
              <span className="font-semibold">Tenant name:</span>{" "}
              {lease.tenant}
            </p>
            <p>
              <span className="font-semibold">Contract Id:</span>{" "}
              {lease.contractId}
            </p>
            <p>
              <span className="font-semibold">Lease dates:</span>{" "}
              {lease.leaseStart} to {lease.leaseEnd}
            </p>
            <p>
              <span className="font-semibold">Organisation name:</span>{" "}
              {lease.organisation}
            </p>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              View contract
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
