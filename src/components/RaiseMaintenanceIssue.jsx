import React from "react";
import Sidebar from "./SideBar";

const MaintenanceIssue = ({ activeSection, onSectionChange }) => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full">
        <Sidebar activeSection={activeSection} onSectionChange={onSectionChange}  />
      </div>
      
      {/* Main Content */}
      <section className="flex-1 p-6 bg-gray-100 md:w-3/4">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          
          {/* Heading */}
          <h2 className="text-2xl font-semibold mb-6">Raise Maintenance Issue</h2>
          
          {/* Describe The Issue Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="describe" className="font-medium">Describe The Issue</label>
              <textarea
                id="describe"
                placeholder="Write your issue"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="upload" className="font-medium">Upload Photo / Video</label>
              <input
                id="upload"
                type="file"
                className="w-full border-2 border-gray-300 p-3 rounded-md cursor-pointer"
              />
            </div>
          </div>
          
          {/* Buttons Section */}
          <div className="mt-8">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer">
              Raise New Issue
            </button>
          </div>

          {/* View Past and Open Issues */}
          <div className="flex justify-between items-center mt-6">
            <button className="text-blue-600 hover:underline cursor-pointer">
              View Open Issues
            </button>
            <button className="text-blue-600 hover:underline cursor-pointer">
              View Past Issues
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MaintenanceIssue;
