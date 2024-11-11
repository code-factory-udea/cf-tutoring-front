import axiosInstance from "@axios/index";
import { Professor, ProfessorAppointment } from "@interfaces/professor";
import { Tutor } from "@interfaces/tutor";
import { UserList } from "@interfaces/user";

export const getProfessorByUsername = async (username: string) => {
  try {
    const response = await axiosInstance.get(`admin/professor/${username}`);
    return response.data as Professor;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProfessors = async ({ page, name }: { page: number, name: string }) => {
  try {
    const response = await axiosInstance.get("admin/professor",
      {
        params: {
          page,
          name
        }
      }
    );
    return response.data as UserList;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteProfessorSubject = async ({ id }: { id: number }) => {
  try {
    const response = await axiosInstance.delete(`admin/professor/subject`, {
      data: { id },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postProfessorSubject = async ({
  username,
  subjectCode,
}: {
  username: string;
  subjectCode: number;
}) => {
  try {
    const response = await axiosInstance.post(`admin/professor/subject`, {
      username,
      subjectCode,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProfessorSubjects = async () => {
  try {
    const response = await axiosInstance.get(`professor/subject`);
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getProfessorTutor = async (subjectCode: number) => {
  try {
    const response = await axiosInstance.get(`professor/tutor/${subjectCode}`);
    return response.data as Tutor[];
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getProfessorAppointment = async ({ username, initialDate, finalDate }: { username: string, initialDate: string, finalDate: string }) => {
  try {
    const response = await axiosInstance.get(`professor/appointment`, {
      params: {
        username,
        initialDate,
        finalDate
      }
    });
    return response.data as ProfessorAppointment[];
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}