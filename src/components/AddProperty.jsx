import React, { useState } from "react";

// Simulated houses array
export const houses = [];

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    deposit: "",
    description: "",
    beds: "",
    bathrooms: "",
    size: "",
    vehicles: "",
    floor: "",
    furnishing: "",
    propertyType: "",
    lift: "",
    security: "",
    powerBackup: "",
    propertyAge: "",
    waterSupply: "",
    facing: "",
    balcony: "",
    nearbyLocation: "",
    nearbyMetro: "",
    nearbyMall: "",
    latitude: "",
    longitude: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      id: houses.length + 1,
      agentId: 1, // Replace with actual agent ID logic
      title: formData.title,
      location: formData.location,
      image: [formData.imagePreview || ""], // Add image upload logic later
      description: formData.description,
      beds: parseInt(formData.beds),
      size: formData.size,
      vehicles: formData.vehicles,
      price: parseInt(formData.rent),
      discount: null,
      deposit: formData.deposit,
      bathrooms: parseInt(formData.bathrooms),
      parking: 1, // Optional: can be added to form
      floor: formData.floor,
      furnishing: formData.furnishing,
      propertyType: formData.propertyType,
      lift: formData.lift,
      security: formData.security,
      powerBackup: formData.powerBackup,
      propertyAge: parseInt(formData.propertyAge),
      waterSupply: formData.waterSupply,
      facing: formData.facing,
      balcony: formData.balcony,
      nearbyLocation: formData.nearbyLocation,
      nearbyMetro: formData.nearbyMetro,
      nearbyMall: formData.nearbyMall,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };

    console.log("New Property:", newProperty);

    // Simulate pushing to database or state
    houses.push(newProperty);

    alert("Property added!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white border rounded-2xl shadow-lg p-10 overflow-y-auto max-h-screen">
        <h2 className="text-center font-bold italic text-2xl mb-8">
          ENTER THE PROPERTY DETAILS
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "title", label: "Property Title" },
            { name: "location", label: "Location" },
            { name: "rent", label: "Rent" },
            { name: "deposit", label: "Deposit" },
            { name: "beds", label: "Beds" },
            { name: "bathrooms", label: "Bathrooms" },
            { name: "size", label: "Size" },
            { name: "vehicles", label: "Vehicle Parking Info" },
            { name: "floor", label: "Floor" },
            { name: "furnishing", label: "Furnishing" },
            { name: "propertyType", label: "Property Type" },
            { name: "lift", label: "Lift" },
            { name: "security", label: "Security" },
            { name: "powerBackup", label: "Power Backup" },
            { name: "propertyAge", label: "Property Age" },
            { name: "waterSupply", label: "Water Supply" },
            { name: "facing", label: "Facing" },
            { name: "balcony", label: "Balcony Info" },
            { name: "nearbyLocation", label: "Nearby Location" },
            { name: "nearbyMetro", label: "Nearby Metro" },
            { name: "nearbyMall", label: "Nearby Mall" },
            { name: "latitude", label: "Latitude" },
            { name: "longitude", label: "Longitude" },
          ].map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.label}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-base outline-none"
            />
          ))}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-3 text-base outline-none resize-none"
          />

          {/* Image Upload */}
          <div className="w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="mx-auto h-52 object-cover rounded-lg"
              />
            ) : (
              <p className="font-semibold text-gray-600 text-base">
                Drop or select your property image here
              </p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="block mt-3 text-sm text-blue-600 cursor-pointer"
            >
              Browse files
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full text-base font-semibold hover:bg-blue-700 transition"
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
}
