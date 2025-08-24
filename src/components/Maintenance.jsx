import React from "react";
import Sidebar from "./SideBar";

const  MaintenanceIssue = ({ activeSection, onSectionChange }) => {
  return (
    <div className="flex">
      <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-6">Raise Maintenance Issue</h2>
          <div>
            <label for="describe"> Describe The Issue </label>
            <input id="describe" type="textarea" placeholder="Write Your Issue" className="h-15 border-2" />
            <input type="file" /> 
          </div>

          <div className="text-center py-12">
            <p className="text-gray-500">Maintenance issue form will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceIssue