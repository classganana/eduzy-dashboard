// import ReportTable from "@/components/ReortTable/report-table"; // Import the ReportTable
import ProfileDetails from "@/components/ProfileDetails/profile-details";
// Data for the table
// const rows = [
//   {
//     key: "1",
//     student: "Chris Jose P",
//     attemptedQuestions: 48,
//     totalScore: "42 / 50",
//     scorePercentage: "84%",
//   },
//   {
//     key: "2",
//     student: "Chris Jose P",
//     attemptedQuestions: 48,
//     totalScore: "42 / 50",
//     scorePercentage: "89%",
//   },
//   {
//     key: "3",
//     student: "Chris Jose P",
//     attemptedQuestions: 48,
//     totalScore: "42 / 50",
//     scorePercentage: "84%",
//   },
//   {
//     key: "4",
//     student: "Chris Jose P",
//     attemptedQuestions: 48,
//     totalScore: "42 / 50",
//     scorePercentage: "84%",
//   },
// ];

// // Columns for the table
// const columns = [
//   {
//     key: "student",
//     label: "Student",
//   },
//   {
//     key: "attemptedQuestions",
//     label: "Attempted questions",
//   },
//   {
//     key: "totalScore",
//     label: "Total score",
//   },
//   {
//     key: "scorePercentage",
//     label: "Score %",
//   },
// ];

const profileData = {
  name: "Rekha Ramareddy",
  email: "rekha.r@fks.edu",
  number: "9970263474",
  school: "FKS School",
  profileImage: "",
};

const gradeSubjects = [
  { grade: "Grade 5 A", subject: "English" },
  { grade: "Grade 5 B", subject: "Math" },
  { grade: "Grade 5 C", subject: "Science" },
  { grade: "Grade 5 A", subject: "English" },
  { grade: "Grade 5 B", subject: "Hindi" },
  { grade: "Grade 5 C", subject: "Science" },
];

type Props = {};

const Reports = (_props: Props) => {
  return (
    <div>
      <h1>Reports</h1> {/* Add a title */}
      {/* <ReportTable columns={columns} items={rows} />{" "} */}
      {/* Pass columns and rows */}
      <ProfileDetails gradeSubjects={gradeSubjects} profileData={profileData} />
    </div>
  );
};

export default Reports;
