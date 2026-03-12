import { useState, useRef, useEffect } from "react";

// Simulated houses array
export const houses = [];

export default function PropertyForm() {
  const [step, setStep] = useState(1);
  const formRef = useRef(null);

  // category titles for each step
  const categories = [
    "Basic Details",
    "Property Features",
    "Pricing & Location",
    "Images Upload",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    propertyAge: "",
    furnishing: "",
    floor: "",
    size: "",
    facing: "",
    location: "",
    rent: "",
    deposit: "",
    beds: "",
    bathrooms: "",
    balcony: "",
    vehicles: "",
    parking: "",
    lift: "",
    security: "",
    powerBackup: "",
    waterSupply: "",
    nearbyLocation: "",
    nearbyMetro: "",
    nearbyMall: "",
    latitude: "",
    longitude: "",
    discount: "",
    images: [],
    imagePreviews: [],
  });

  // Cleanup URLs on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      formData.imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [formData.imagePreviews]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
      imagePreviews: [...prev.imagePreviews, ...newPreviews],
    }));
  };

  const removeImage = (index) => {
    // Revoke the URL to prevent memory leak
    URL.revokeObjectURL(formData.imagePreviews[index]);
    
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const newProperty = {
      id: houses.length + 1,
      agentId: 1,
      title: formData.title,
      location: formData.location,
      image: formData.images,
      description: formData.description,
      beds: parseInt(formData.beds),
      size: formData.size,
      vehicles: formData.vehicles,
      price: parseInt(formData.rent),
      discount: formData.discount ? parseFloat(formData.discount) : null,
      deposit: formData.deposit,
      bathrooms: parseInt(formData.bathrooms),
      parking: formData.parking || 1,
      nearbyMetro: formData.nearbyMetro,
      nearbyMall: formData.nearbyMall,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      propertyType: formData.propertyType,
      propertyAge: formData.propertyAge,
      furnishing: formData.furnishing,
      floor: formData.floor,
      facing: formData.facing,
      balcony: formData.balcony,
      lift: formData.lift,
      security: formData.security,
      powerBackup: formData.powerBackup,
      waterSupply: formData.waterSupply,
      nearbyLocation: formData.nearbyLocation,
    };

    console.log("New Property:", newProperty);
    houses.push(newProperty);
    alert("Property added!");
  };

  const validateStep = (currentStep) => {
    const requiredFields = {
      1: ['title', 'description', 'propertyType', 'propertyAge', 'furnishing', 'floor', 'size', 'facing'],
      2: ['beds', 'bathrooms', 'balcony', 'parking'],
      3: ['location', 'rent'],
      4: ['images']
    };

    const stepFields = requiredFields[currentStep] || [];
    
    for (const field of stepFields) {
      if (field === 'images') {
        if (!formData.images || formData.images.length === 0) {
          alert('Please upload at least one property image before proceeding.');
          return false;
        }
      } else if (!formData[field] || formData[field].toString().trim() === '') {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field before proceeding.`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto" ref={formRef}>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step > index + 1 ? "bg-blue-400 text-white" : 
                    step === index + 1 ? "bg-blue-600 text-white scale-110" : 
                    "bg-gray-200 text-gray-500"
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step === index + 1 ? "text-blue-600" : "text-gray-500"}`}>
                    {category}
                  </span>
                </div>
                {index < categories.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                    step > index + 1 ? "bg-blue-400" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {categories[step - 1]}
          </h2>

          {/* BASIC DETAILS */}
          {step === 1 && (
            <div className="grid gap-6 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title <span className="text-red-500">*</span></label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                <textarea
                  name="description"

                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type <span className="text-red-500">*</span></label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 cursor-pointer"
                  >
                    <option value="">Select type</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="more than 3 BHK">More than 3 BHK</option>
                    <option value="Independent House">Independent House</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Age (years) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    min="0"
                    name="propertyAge"
                    value={formData.propertyAge}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing <span className="text-red-500">*</span></label>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 cursor-pointer"
                  >
                    <option value="">Select furnishing</option>
                    <option value="un furnished">Un Furnished</option>
                    <option value="semi furnished">Semi Furnished</option>
                    <option value="fully furnished">Fully Furnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floor <span className="text-red-500">*</span></label>
                  <input
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size (sqft) <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facing <span className="text-red-500">*</span></label>
                  <input
                    name="facing"
                    value={formData.facing}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PROPERTY FEATURES */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beds <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  min="0"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  min="0"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Balcony Info <span className="text-red-500">*</span></label>
                <input
                  name="balcony"
                  value={formData.balcony}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Parking Info</label>
                <input
                  name="vehicles"
                  value={formData.vehicles}
                  onChange={handleChange}

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parking <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lift</label>
                <select
                  name="lift"
                  value={formData.lift}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 cursor-pointer"
                >
                  <option value="">Select Lift</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security</label>
                <input
                  name="security"
                  value={formData.security}
                  onChange={handleChange}

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Power Backup</label>
                <input
                  name="powerBackup"
                  value={formData.powerBackup}
                  onChange={handleChange}

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Supply</label>
                <input
                  name="waterSupply"
                  value={formData.waterSupply}
                  onChange={handleChange}

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* PRICING & LOCATION */}
          {step === 3 && (
            <div className="grid gap-6 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹/month) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    min="0"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deposit (₹)</label>
                  <input
                    type="number"
                    min="0"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleChange}

                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}

                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nearby Location</label>
                  <input
                    name="nearbyLocation"
                    value={formData.nearbyLocation}
                    onChange={handleChange}

                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nearby Metro</label>
                  <input
                    name="nearbyMetro"
                    value={formData.nearbyMetro}
                    onChange={handleChange}

                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nearby Mall</label>
                  <input
                    name="nearbyMall"
                    value={formData.nearbyMall}
                    onChange={handleChange}

                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}

                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}

                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* IMAGES UPLOAD */}
          {step === 4 && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-medium text-gray-700 mb-4">Property Images <span className="text-red-500">*</span></label>
              
              {/* Image Previews */}
              {formData.imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {formData.imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-all duration-200 cursor-pointer">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Add images</p>
                  {formData.images.length > 0 && (
                    <p className="text-sm text-gray-500">{formData.images.length} image(s) selected</p>
                  )}
                </div>
                <input
                  type="file"
                  name="images"
                  onChange={handleImageChange}
                  className="hidden"
                  id="fileInput"
                  accept="image/*"
                  multiple
                />
                <label
                  htmlFor="fileInput"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  Browse Files
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
              >
                ← Back
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => {
                  if (validateStep(step)) {
                    handleSubmit();
                  }
                }}
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
              >
                ✓ Submit Property
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
