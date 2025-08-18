import React, { useState } from "react";

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rent: "",
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
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white border rounded-2xl shadow-lg p-10">
        <h2 className="text-center font-bold italic text-2xl mb-8">
          ENTER THE PROPERTY DETAILS
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Name */}
          <input
            type="text"
            name="name"
            placeholder="Property name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 text-lg outline-none"
          />

          {/* Address */}
          {/* Address */}
<textarea
  name="address"
  placeholder="Address"
  value={formData.address}
  onChange={handleChange}
  rows={4} // Adjust height (number of lines visible)
  className="w-full border rounded-lg p-4 text-lg outline-none resize-none"
/>


          {/* Rent */}
          <input
            type="number"
            name="rent"
            placeholder="Rent (₹ / $)"
            value={formData.rent}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 text-lg outline-none"
          />

          {/* Image Upload */}
          <div className="w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50">
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="mx-auto h-52 object-cover rounded-lg"
              />
            ) : (
              <p className="font-semibold text-gray-600 text-lg">
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

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-4 rounded-lg w-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
}
