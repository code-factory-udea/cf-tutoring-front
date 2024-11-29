export interface TutorSchedule {
  id?: number;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Tutor {
  username: string;
  name: string;
}
