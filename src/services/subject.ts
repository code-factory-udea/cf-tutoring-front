import axiosInstance from "@axios/index";

import { Subject, SubjectTutor } from "../interfaces/subject";

export const postSubject = async (subjectData) => {
  const response = await axiosInstance.post("/admin/subject", subjectData);
  return response.data;
};

export const postSubjectTutor = async ({
  username,
  subjectCode,
}: SubjectTutor) => {
  try {
    const response = await axiosInstance.post(`admin/tutor/subject`, {
      username,
      subjectCode,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to post subject tutor");
  }
};

export const getSubjects = async ({ academicProgramId }: { academicProgramId: number }) => {
  try {
    const response = await axiosInstance.get("subject", {
      params: {
        academicProgramId,
      }
    });
    return response.data as Subject[];
  } catch (error) {
    throw new Error("Failed to get subjects");
  }
}