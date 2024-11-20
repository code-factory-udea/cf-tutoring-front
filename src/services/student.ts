import axiosInstance from "@axios/index";
import { UserList } from "@interfaces/user";
import { TutoringRequestResponse, TutoringRequestPayload, SurveyPayload, SurveyResponse, CancelTutoringRequest } from "@interfaces/student";
import { Appointment } from "@interfaces/student";

export const getStudents = async ({ page, name }: { page: number, name: string }) => {
  try {
    const response = await axiosInstance.get("admin/student",
      {
        params: {
          page,
          name
        }
      }
    );
    return response.data as UserList;
  } catch (error) {
    throw new Error("Failed to get students");
  }
};

export const getTutorByUsername = async (username: string) => {
  try {
    const response = await axiosInstance.get(`admin/tutor/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get tutor");
  }
};

export const getMonitors = async ({ page, name }: { page: number, name: string }) => {
  try {
    const response = await axiosInstance.get("admin/tutor",
      {
        params: {
          page,
          name
        }
      }
    );
    return response.data as UserList;
  } catch (error) {
    throw new Error("Failed to get monitors");
  }
};

export const getMonitorsBySubjectId = async (subjectId: number) => {
  try {
    const response = await axiosInstance.get(`/appointment/student/${subjectId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get monitors by subject ID")
  }
};

export const getTutoringSchedule = async (username: string) => {
  const response = await axiosInstance.get(`/appointment/student/tutor/${username}`);
  return response.data;
};

export const requestTutoring = async (payload: TutoringRequestPayload): Promise<TutoringRequestResponse> => {
  const response = await axiosInstance.post("/appointment/student", payload);
  return response.data as TutoringRequestResponse;
};

export const getPendingAppointments = async (params: { status: string }): Promise<Appointment[]> => {
  const { data } = await axiosInstance.get<Appointment[]>("/appointment/student", {
    params: {
      status: params.status,
    },
  });
  return data;
};

export const postAppointmentSurvey = async (payload: SurveyPayload): Promise<SurveyResponse> => {
  const { data } = await axiosInstance.post<SurveyResponse>("/appointment/student/survey", payload);
  return data;
};

export const cancelTutoring = async (id: number): Promise<CancelTutoringRequest> => {
  const response = await axiosInstance.patch<CancelTutoringRequest>("/appointment/student/request", {
    id,
  });
  return response.data;
};

export const cancelTutoringProgram = async (id: number): Promise<CancelTutoringRequest> => {
  const response = await axiosInstance.patch<CancelTutoringRequest>("/appointment/student", {
    id,
  });
  return response.data;
};