import axiosInstance from "../axios";
import { UpdateUserRole } from "../interfaces/user";

export const getUserByname = async (name: string) => {
  try {
    const response = await axiosInstance.get(`admin/user/${name}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};

export const updateUserRole = async ({ data }: { data: UpdateUserRole }) => {
  try {
    const response = await axiosInstance.patch(`admin/user/user-role`,  data );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user role");
  }
};
