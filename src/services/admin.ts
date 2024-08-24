import axiosInstance from '@axios/index';
import { Admin } from '@interfaces/admin';

export const getAdmin = async () => {
    try {
        const response = await axiosInstance.get('admin/admin')
        return response.data as Admin[];
    } catch (error) {
        throw new Error('Failed to get admin');
    }
};

export const getAdminOthers = async () => {
    try {
        const response = await axiosInstance.get('admin/others');
        return response.data as Admin[];
    } catch (error) {
        throw new Error('Failed to get admin');
    }
}

export const getRoles = async () => {
    try {
        const response = await axiosInstance.get('admin/role');
        return response.data as Admin[];
    } catch (error) {
        throw new Error('Failed to get roles');
    }
}