import axiosInstance from "@axios/index";
import { AppointmentList, AppointmentResponse } from "@interfaces/appointment";

export const getAppointmentsCSV = async ({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) => {
  try {
    const response = await axiosInstance.post("admin/appointment/csv", {
      initialDate,
      finalDate,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAppointmentById = async (appointmentId: number) => {
  try {
    const response = await axiosInstance.get(
      `admin/appointment/${appointmentId}`,
    );
    return response.data as AppointmentResponse;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAppointments = async ({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) => {
  try {
    const response = await axiosInstance.get(`admin/appointment`, {
      params: { initialDate, finalDate },
    });
    return response.data as AppointmentResponse[];
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAppointmentsTutor = async (status: string) => {
  try {
    const response = await axiosInstance.get(
      `appointment/tutor?status=${status}`,
    );
    return response.data as AppointmentList[];
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postAppointmentTutorResponse = async (data: {
  id: number;
  appointmentResponse: string;
}) => {
  try {
    const response = await axiosInstance.post("appointment/tutor", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAppointmentTutorCompleted = async (appoimentId: number) => {
  try {
    const response = await axiosInstance.get(
      `appointment/tutor/${appoimentId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateAppointmentTutorResponse = async (data: { id: number }) => {
  try {
    const response = await axiosInstance.patch("appointment/tutor", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
