import axiosInstance from "../axios";

export const getStudents = async () => {
    try {
        const response = await axiosInstance.get('admin/student');
        return response.data
    } catch (error) {
        throw new Error('Failed to get students');
    }
}   

export const getTutorByUsername = async (username:string) => {
    try {
        const response = await axiosInstance.get(`admin/tutor/${username}`);
        return response.data
    } catch (error) {
        throw new Error('Failed to get tutor');
    }
}