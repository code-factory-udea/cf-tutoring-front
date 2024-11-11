export interface Professor {
  name: string;
  username: string;
  professorSubjectInfoDTO: ProfessorSubjectInfo[];
}

interface ProfessorSubjectInfo {
  idProfessor: number;
  subjectInfo: string;
  academicProgramInfo: number;
}

export interface ProfessorAppointment {
  id: string;
  tutorName: string;
  studentName: string;
  virtual: boolean;
  status: string;
  date: Date;
  creationDate: Date;
}