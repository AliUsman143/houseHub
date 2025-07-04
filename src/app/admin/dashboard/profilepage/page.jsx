"use client";
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebarr";
import ProfileDropdown from "../../components/ProfileDropdown";

// Icons
const BellIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CameraIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const ProfileSettingPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    profilePicture: null,
    previewImage: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Load profile data if ID is in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('profileId');
    
    if (profileId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/addprofileusers`);
          const data = await response.json();
          
          if (response.ok) {
            const profile = data.profiles.find(p => p.id === profileId);
            if (profile) {
              setFormData({
                id: profile.id,
                username: profile.username,
                email: profile.email,
                phoneNo: profile.phoneNo,
                password: "",
                profilePicture: null,
                previewImage: profile.profilePicture
              });
            }
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      
      fetchProfile();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
          previewImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNo", formData.phoneNo);
      formDataToSend.append("password", formData.password);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const response = await fetch("/api/addprofileusers", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create profile");
      }

      setSuccess("Profile saved successfully!");
      // Update the form with the new ID if this was a new profile
      if (!formData.id && data.profile) {
        setFormData(prev => ({
          ...prev,
          id: data.profile.id
        }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
      }`}>
        {/* Top Bar */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden mr-4 p-2 rounded-md bg-[#002f86] text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              {formData.id ? "Edit Profile" : "Create Profile"}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer">
              <BellIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
            </div>
            <ProfileDropdown currentProfile={{
              profilePicture: formData.previewImage || "https://placehold.co/40x40/cccccc/ffffff?text=U",
              username: formData.username || "Profile"
            }} />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 max-w-4xl mx-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  {formData.previewImage ? (
                    <img
                      src={formData.previewImage}
                      alt="Profile preview"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <UserCircleIcon className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300" />
                  )}
                  <div
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-200 shadow-md cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <CameraIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                >
                  {formData.previewImage ? "Change picture" : "Add picture"}
                </button>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      placeholder="John"
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="John@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phoneNo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone no
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="tel"
                        id="phoneNo"
                        name="phoneNo"
                        placeholder="+92 3051023906"
                        value={formData.phoneNo}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder={formData.id ? "Leave blank to keep current" : "**********"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required={!formData.id}
                        minLength="8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      id: "",
                      username: "",
                      email: "",
                      phoneNo: "",
                      password: "",
                      profilePicture: null,
                      previewImage: "",
                    });
                    setError("");
                    setSuccess("");
                  }}
                  className="px-4 sm:px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 sm:px-6 py-2 text-sm font-medium text-white bg-[#ff9800] rounded-md transition-colors ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-[#e68a00]"
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettingPage;