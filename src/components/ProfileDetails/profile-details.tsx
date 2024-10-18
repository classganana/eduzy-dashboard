import React, { useState, useRef } from "react";

import { ProfileDetailsProps } from "./profile-details.interface";

import editIcon from "@/assets/pencil.png";
import EditProfile from "@/pages/editProfile";

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  profileData,
  gradeSubjects,
}) => {
  const [image, setImage] = useState<string>(profileData.profileImage || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: profileData.name || "",
    school: profileData.school || "",
    email: profileData.email || "",
    phoneNumber: profileData.number || "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Form data saved:", formData);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 mt-6">
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

          <button
            className="absolute top-12 right-40 mr-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <img alt="Edit" className="h-8 w-8" src={editIcon} />
          </button>

          <input
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleImageChange}
          />
        </div>

        {isEditing ? (
          <EditProfile
            formData={formData}
            handleSave={handleSave}
            setFormData={setFormData}
          />
        ) : (
          <>
            <div className="bg-blue-50 p-6 rounded-lg relative">
              <button
                className="absolute top-2 right-2 p-3"
                onClick={() => setIsEditing(true)}
              >
                <img alt="Edit" className="h-10 w-10" src={editIcon} />
              </button>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {formData.name}
                </h2>
                <p className="text-sm text-gray-500">{formData.school}</p>
                <p className="mt-1 text-gray-700 text-sm">
                  {formData.email} <span className="px-1">|</span>{" "}
                  {formData.phoneNumber}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                GRADE AND SUBJECTS
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                {gradeSubjects.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="pr-4">{item.grade}</div>
                    <div className="text-right">{item.subject}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
