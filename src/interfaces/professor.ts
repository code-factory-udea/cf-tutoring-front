export interface Professor {
  id: number;
  name: string;
  username: string;
  professorSubjectInfo: ProfessorSubjectInfo[];
}

interface ProfessorSubjectInfo {
  subjectId: number;
  accademicProgramInfo: number;
}
