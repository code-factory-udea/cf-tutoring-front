import axiosInstance from "@axios/index";
import { AppointmentResponse } from "@interfaces/appointment";

export const getAppointmentsCSV = async () => {
    try {
        const response = await axiosInstance.get('admin/appointment/csv')
        return response.data;
    } catch (error) {
        throw new Error('Failed to get appointments CSV');
    }
}

export const getAppointmentById = async (appointmentId: number) => {
    try {
        const response = await axiosInstance.get(`admin/appointment/${appointmentId}`);
        return response.data as AppointmentResponse;
    } catch (error) {
        throw new Error('Failed to get appointment');
    }
}

export const getAppointments = async () => {
    try {
        const response = await axiosInstance.get('admin/appointment');
        return response.data as AppointmentResponse[];
    } catch (error) {
        throw new Error('Failed to get appointments');
    }
}