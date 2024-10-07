// profile-details.tsx
import React, { useState } from "react";

import { ProfileDetailsProps } from "./profile-details.interface"; // Adjust path if necessary

import editIcon from "@/assets/pencil.png";

// Define the ProfileDetails component with props
const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  profileData,
  gradeSubjects,
}) => {
  const [image] = useState<string>(profileData.profileImage || ""); // Use profile image from props, fallback to empty string if none is provided

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 mt-6 h-[600px] max-w-2xl">
        {/* Profile Image and Edit button */}
        <div className="flex items-center justify-center mb-6 relative w-20 h-20 rounded-full mx-auto">
          {image ? (
            <img
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
              src={image}
            />
          ) : (
            <div className="w-16 h-16 bg-blue-200 flex items-center justify-center rounded-full">
              <span className="text-blue-500 text-3xl">👤</span>
            </div>
          )}
          <button className="p-2 rounded-full absolute bottom-0 right-0">
            <img alt="Edit" className="h-5 w-5" src={editIcon} />
          </button>
        </div>

        {/* Profile Details */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {profileData.name}
          </h2>
          <p className="text-sm text-gray-500">{profileData.school}</p>
          <p className="mt-2 text-gray-700">
            {profileData.email} <span className="px-1">|</span>{" "}
            {profileData.number}
          </p>
        </div>

        {/* Grade and Subjects */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            GRADE AND SUBJECTS
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {gradeSubjects.map((item, index) => (
              <React.Fragment key={index}>
                <div className="pr-4">{item.grade}</div> {/* Display Grade */}
                <div className="text-right">{item.subject}</div>{" "}
                {/* Display Subject */}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails; // Ensure proper export
