export interface ProfileData {
  name: string;
  email: string;
  number: string;
  school: string;
  profileImage: string;
}

export interface GradeSubject {
  grade: string;
  subject: string;
}

export interface ProfileDetailsProps {
  profileData: ProfileData;
  gradeSubjects: GradeSubject[];
}
