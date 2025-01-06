"use client";

import React, { useState } from "react";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const toggleEditMode = () => setIsEditing(!isEditing);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      address: "",
    };

    if (!userDetails.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!userDetails.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(userDetails.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
      isValid = false;
    }
    if (!userDetails.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(userDetails.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!userDetails.address) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Saved Details:", userDetails);
      setIsEditing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-50 p-6">
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border border-gray-200">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-400">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {profileImage ? (
              <img
                src={profileImage}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-green-700 via-green-500 to-green-300 text-white font-semibold">
                Upload
              </div>
            )}
            {isEditing && (
              <label
                htmlFor="profileImage"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm cursor-pointer hover:opacity-80"
              >
                Upload
              </label>
            )}
            <input
              type="file"
              id="profileImage"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-white text-center">
            {userDetails.name || "Your Name"}
          </h2>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center lg:text-left">
            User Profile
          </h1>
          <form className="space-y-6">
            {[
              { label: "Name", id: "name", type: "text" },
              { label: "Phone", id: "phone", type: "text" },
              { label: "Email", id: "email", type: "email" },
              { label: "Address", id: "address", type: "text" },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm sm:text-lg font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={userDetails[field.id as keyof typeof userDetails]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
                    isEditing || !userDetails[field.id as keyof typeof userDetails]
                      ? "bg-green-50"
                      : "bg-gray-100"
                  }`}
                />
                {errors[field.id as keyof typeof errors] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.id as keyof typeof errors]}
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-center lg:justify-start mt-6">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium text-lg rounded-lg shadow-md hover:bg-teal-600 hover:shadow-lg focus:outline-none transform transition-transform hover:scale-105"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-medium text-lg rounded-lg shadow-md hover:bg-teal-600 hover:shadow-lg focus:outline-none transform transition-transform hover:scale-105 mr-3"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={toggleEditMode}
                    className="px-6 py-3 bg-gray-400 text-white font-medium text-lg rounded-lg shadow-md hover:bg-gray-500 hover:shadow-lg focus:outline-none transform transition-transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;






