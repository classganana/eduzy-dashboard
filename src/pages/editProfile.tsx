import React from "react";

export interface EditProfileProps {
  formData: {
    name: string;
    school: string;
    email: string;
    phoneNumber: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      school: string;
      email: string;
      phoneNumber: string;
    }>
  >;
  handleSave: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  formData,
  setFormData,
  handleSave,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Card Header */}
      <div className="mb-6">
        <h2 className="text-xl font-normal text-gray-900">PERSONAL DETAILS</h2>
      </div>

      {/* Card Content */}
      <div className="space-y-4">
        {/* First Name */}
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Rekha"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        {/* Last Name */}
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ramareddy"
          type="text"
          value={formData.school}
          onChange={(e) => setFormData({ ...formData, school: e.target.value })}
        />

        {/* Email and Phone (2 Columns) */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="rekha.r@fks.edu"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="9970263474"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </div>

        {/* Save Button */}
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
