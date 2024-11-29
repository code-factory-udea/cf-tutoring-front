import axiosInstance from "@axios/index";
import { AcademicProgram } from "@interfaces/academic";

export const getFaculty = async () => {
  try {
    const response = await axiosInstance.get("academic/faculty");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get Faculty");
  }
};

export const getAcademicProgram = async ({
  facultyId,
}: {
  facultyId: number;
}) => {
  try {
    const response = await axiosInstance.get("academic/academic-program", {
      params: {
        facultyId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get academic program");
  }
};

export const postAcademicProgram = async (data: AcademicProgram) => {
  try {
    const response = await axiosInstance.post("admin/academic-program", data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post academic program");
  }
};

export const postFaculty = async ({ name }: { name: string }) => {
  try {
    const response = await axiosInstance.post("admin/faculty", name);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post faculty");
  }
};

export const updateAcademicProgram = async (academicData) => {
  const response = await axiosInstance.patch(
    "admin/academic-program",
    academicData,
  );
  return response.data;
};
