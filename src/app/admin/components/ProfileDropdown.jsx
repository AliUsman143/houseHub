import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile } from "@/app/context/ProfileContext";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const { selectedProfile, setSelectedProfile } = useProfile();

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await fetch("/api/getAllProfiles");
      const data = await res.json();
      if (res.ok) setProfiles(data.profiles);
    };
    fetchProfiles();
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center space-x-2"
      >
        <img
          src={selectedProfile?.profilePicture || "https://placehold.co/40x40/cccccc/ffffff?text=U"}
          className="w-8 h-8 rounded-full"
          alt="profile"
        />
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586...z" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">Select Profile</div>
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProfileSelect(profile)}
            >
              <img src={profile.profilePicture} className="w-6 h-6 rounded-full" />
              <span>{profile.username}</span>
            </div>
          ))}
          <Link
            href="/admin/dashboard/profilepage"
            className="block text-sm text-blue-600 px-4 py-2 border-t hover:bg-gray-100"
          >
            + Add New Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
