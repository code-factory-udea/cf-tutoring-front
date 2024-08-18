import axiosInstance from "../axios";
import { Professor } from "../interfaces/professor";

export const getProfessorByUsername = async (username: string) => {
    try {
        const response = await axiosInstance.get(`admin/professor/${username}`);
        return response.data as Professor;
    } catch (error) {
        throw new Error('Failed to get professor');
    }
}

export const getProfessors = async () => {
    try {
        const response = await axiosInstance.get('admin/professor');
        return response.data as Professor[];
    } catch (error) {
        throw new Error('Failed to get professors');
    }
}

export const deleteProfessorSubject = async ({ idProfessor, subjectCode }: { idProfessor: number, subjectCode: number }) => {
    try {
        const response = await axiosInstance.delete(`admin/professor/subject`,
            { data: { idProfessor, subjectCode } });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete professor subject');
    }
}

export const postProfessorSubject = async ({ username, subjectCode }: { username: string, subjectCode: number }) => {
    try {
        const response = await axiosInstance.post(`admin/professor/subject`,
            { username, subjectCode });
        return response.data;
    } catch (error) {
        throw new Error('Failed to post professor subject');
    }
}