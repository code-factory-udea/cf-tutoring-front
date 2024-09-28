export interface Professor {
  name: string;
  username: string;
  professorSubjectInfoDTO: ProfessorSubjectInfo[];
}

interface ProfessorSubjectInfo {
  idProfessor: number;
  subjectId: number;
  accademicProgramInfo: number;
}
