import axiosInstance from "@axios/index";
import { UserList } from "@interfaces/user";

export const getUndefined = async ({
  page,
  name,
}: {
  page: number;
  name: string;
}) => {
  try {
    const response = await axiosInstance.get("admin/others", {
      params: {
        page,
        name,
      },
    });
    return response.data as UserList;
  } catch (error) {
    throw new Error("Failed to get students");
  }
};
