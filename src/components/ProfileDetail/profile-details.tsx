import React, { useState } from "react";

import editIcon from "@/assets/pencil.png";
interface ProfileData {
  name: string;
  email: string;
  number: string;
  school: string;
  profileImage: string;
}

interface GradeSubject {
  grade: string;
  subject: string;
}

interface ProfileDetailsProps {
  profileData: ProfileData;
  gradeSubjects: GradeSubject[];
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  profileData,
  gradeSubjects,
}) => {
  const [image] = useState<string>(profileData.profileImage || ""); // Profile image state

  // State to manage editing mode
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    name: profileData.name || "",
    school: profileData.school || "",
    email: profileData.email || "",
    number: profileData.number || "",
  });

  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle save action
  const handleSave = () => {
    // Here you would typically send formData to your backend or state management
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 mt-6">
        {/* Profile Image (outside background area) */}
        <div className="flex items-center justify-center relative mb-6">
          <div className="w-20 h-20 bg-blue-200 flex items-center justify-center rounded-full">
            {image ? (
              <img
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                src={image}
              />
            ) : (
              <span className="text-blue-500 text-3xl">👤</span>
            )}
          </div>

          {/* Edit button styled similarly to the one in profile details */}
          <button className="absolute top-12 right-40 mr-2">
            <img alt="Edit" className="h-8 w-8" src={editIcon} />
          </button>
        </div>

        {/* Profile Section with Background (excluding image) */}
        <div className="bg-blue-50 p-6 rounded-lg relative">
          {/* Edit button positioned in the top-right corner */}
          <button
            className="absolute top-2 right-2 p-3"
            onClick={() => setIsEditing(true)}
          >
            <img alt="Edit" className="h-10 w-10" src={editIcon} />
          </button>

          {/* Conditional rendering: Edit form or profile information */}
          {isEditing ? (
            // Edit Form
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                EDIT PROFILE
              </h3>
              <input
                className="border p-2 rounded-lg w-full mb-4"
                name="name"
                placeholder="Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="border p-2 rounded-lg w-full mb-4"
                name="school"
                placeholder="School"
                type="text"
                value={formData.school}
                onChange={handleChange}
              />
              <input
                className="border p-2 rounded-lg w-full mb-4"
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="border p-2 rounded-lg w-full mb-4"
                name="number"
                placeholder="Phone Number"
                type="text"
                value={formData.number}
                onChange={handleChange}
              />
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          ) : (
            // Profile Information
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {formData.name}
              </h2>
              <p className="text-sm text-gray-500">{formData.school}</p>
              <p className="mt-1 text-gray-700 text-sm">
                {formData.email} <span className="px-1">|</span>{" "}
                {formData.number}
              </p>
            </div>
          )}
        </div>

        {/* Grade and Subjects Section */}
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

export default ProfileDetails;
