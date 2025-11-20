import baseApi from "./baseApi";
import { INotification } from "./types";

export const getAllNotification = async (userId: number) => {
    try {
        const { data } = await baseApi.get<INotification[]>(`/notification?userId=${userId}`);
        return data;
    } catch (error: any) {
        throw error;
    }
}
export const isReadNotification = async (notificationId: number) => {
    try {
        const { data } = await baseApi.put(`/notification/${notificationId}/read`);
        return data;
    } catch (error: any) {
        throw error;
    }
}
