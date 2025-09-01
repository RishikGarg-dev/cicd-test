import React from 'react';

const applications = [
  { id: 1, applicant: 'applicant name', property: 'property 1' },
  { id: 2, applicant: 'applicant name', property: 'property 2' },
  { id: 3, applicant: 'applicant name', property: 'property 3' },
  { id: 4, applicant: 'applicant name', property: 'property 4' },
  { id: 5, applicant: 'applicant name', property: 'property 5' },
];

const ApplicationsList = () => {
  const handleAccept = (id) => {
    console.log(`Accepted application ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejected application ID: ${id}`);
  };

  return (
    <div className="p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border border-gray-300 font-bold text-lg">applicant name</th>
            <th className="p-3 border border-gray-300 font-bold text-lg">property name</th>
            <th className="p-3 border border-gray-300 font-bold text-lg">status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="bg-gray-100 text-gray-700">
              <td className="p-3 border border-gray-300">{app.applicant}</td>
              <td className="p-3 border border-gray-300">{app.property}</td>
              <td className="p-3 border border-gray-300">
                <button
                  onClick={() => handleAccept(app.id)}
                  className="text-green-600 mr-4 hover:underline cursor-pointer"
                >
                  ✅ Accept
                </button>
                <button
                  onClick={() => handleReject(app.id)}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  ❌ Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsList;
