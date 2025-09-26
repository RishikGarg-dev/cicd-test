import React from 'react';

const ServiceCard = ({ service, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border ${
        isSelected ? 'border-blue-600 shadow-md' : 'border-gray-200'
      } p-5 cursor-pointer transition hover:shadow-lg`}
    >
      <div className="text-4xl mb-2">{service.icon}</div>
      <h2 className="text-lg font-medium text-gray-800">{service.name}</h2>
    </div>
  );
};

export default ServiceCard;
