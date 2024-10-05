import React from "react";

import ProfileDetails from "@/components/ProfileDetail/profile-details"; // Ensure the path is correct

function Home() {
  // Profile data
  const profileData = {
    name: "Rekha Ramareddy",
    email: "rekha.r@fks.edu",
    number: "9970263474",
    school: "FKS School",
    profileImage: "",
  };

  // Both grades and subjects data
  const gradeSubjects = [
    { grade: "Grade 5 A", subject: "English" },
    { grade: "Grade 5 B", subject: "Math" },
    { grade: "Grade 5 C", subject: "Science" },
    { grade: "Grade 5 A", subject: "English" },
    { grade: "Grade 5 B", subject: "Hindi" },
    { grade: "Grade 5 C", subject: "Science" },
  ];

  return (
    <>
      {/* Some additional content */}
      <div style={{ color: "blue" }}>Press me</div>

      {/* Profile details component */}
      <ProfileDetails gradeSubjects={gradeSubjects} profileData={profileData} />
    </>
  );
}

export default Home;
