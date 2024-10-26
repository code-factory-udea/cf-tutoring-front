import axiosInstance from "@axios/index";
import { TutorSchedule } from "@interfaces/tutor";

export const postTutorSchedule = async (data: TutorSchedule) => {
    try {
        const response = await axiosInstance.post("tutor/schedule",
            data
        );
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getTutorSchedule = async () => {
    try {
        const response = await axiosInstance.get("tutor/schedule");
        return response.data as TutorSchedule[];
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const postLinkTutorVirtualRoom = async (data: { link: string }) => {
    try {
        const response = await axiosInstance.post("tutor/virtual",
            data
        );
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getLinkTutorVirtualRoom = async () => {
    try {
        const response = await axiosInstance.get("tutor/virtual");
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}