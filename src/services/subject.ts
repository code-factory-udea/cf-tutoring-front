import axiosInstance from "@axios/index";

import { Subject, SubjectTutor } from "../interfaces/subject";

export const postSubject = async ({ code, name, accademicProgramId }: Subject) => {
    try {
        const response = await axiosInstance.post('admin/subject', {
            code, name, accademicProgramId
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to post subject');
    }
}

export const postSubjectTutor = async ({ username, subjectCode }: SubjectTutor) => {
    try {
        const response = await axiosInstance.post(`admin/tutor/subject`,
            { username, subjectCode });
        return response.data;
    } catch (error) {
        throw new Error('Failed to post subject tutor');
    }
}
