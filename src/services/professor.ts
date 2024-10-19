import axiosInstance from "@axios/index";
import { Professor } from "@interfaces/professor";
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

export const deleteProfessorSubject = async ({idProfessor,}: {idProfessor: number}) => {
  try {
    const response = await axiosInstance.delete(`admin/professor/subject`, {
      data: { idProfessor },
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
