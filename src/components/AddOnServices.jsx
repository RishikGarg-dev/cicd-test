import React, { useState } from 'react';
import VendorList from './ServiceVendorList';
import ServiceCard from './AddOnServiceCard';

const services = [
  { name: 'Milk', id: 1, icon: '🥛' },
  { name: 'Water', id: 2, icon: '💧' },
  { name: 'Groceries', id: 3, icon: '🛒' },
  { name: 'Daily Workers', id: 4, icon: '🧹' },
];

const ServicePage = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Add-On Services
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedService === service.id}
            onClick={() => setSelectedService(service.id)}
          />
        ))}
      </div>

      {selectedService && (
        <div className="max-w-6xl mx-auto mt-12">
          <VendorList serviceId={selectedService} />
        </div>
      )}
    </div>
  );
};

export default ServicePage;
