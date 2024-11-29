export interface Appointment {
  tutorId: number;
  isVirtual: number;
  date: string;
}

export interface AppointmentResponse {
  studentName: string;
  tutorName: string;
  date: string;
  creationDate: string;
  status: string;
  calification: string;
  feedback: string;
  calificationDate: string;
  virtual: boolean;
}

export interface AppointmentList {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  virtual: boolean;
}
