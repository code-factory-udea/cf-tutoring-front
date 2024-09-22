import axiosInstance from "@axios/index";
import { UserList } from "@interfaces/user";

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
