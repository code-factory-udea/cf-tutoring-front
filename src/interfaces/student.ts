export interface TutoringRequestPayload {
    tutorUsername: string;
    isVirtual: boolean;
    schedule: {
        id: number;
        day: string;
        startTime: string;
        endTime: string;
    };
  }

export interface TutoringRequestResponse {
    success: boolean;
    message: string;
  }

export interface Appointment {
    id: number;          
    name: string;       
    date: string;        
    startTime: string;  
    endTime: string;  
    virtual: boolean;
  }