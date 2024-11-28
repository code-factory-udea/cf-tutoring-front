import axiosInstance from "@axios/index";
import { Role } from "@interfaces/user";

export const getAdmins = async (page: number, name: string) => {
  try {
    const response = await axiosInstance.get("/admin/admin", {
      params: {
        page,
        name,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching admins");
  }
};

export const getRoles = async () => {
  try {
    const response = await axiosInstance.get("admin/role");
    return response.data as Role[];
  } catch (error) {
    throw new Error("Failed to get roles");
  }
};
