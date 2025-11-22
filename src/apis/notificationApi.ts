import baseApi from "./baseApi";
import { INotification } from "./types";

export const getAllNotification = async (userId: number) => {
    try {
        const { data } = await baseApi.get<INotification[]>(`/notifications?userId=${userId}`);
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
export const deleteAllNotification = async (userId: number) => {
    try {
        const { data } = await baseApi.delete(`/notifications/${userId}`);
        return data;
    } catch (error: any) {
        throw error;
    }
}


export const deleteNotificationById = async (
    notificationId: number,
    userId: number
): Promise<INotification> => {
    try {
        const response = await baseApi.delete<INotification>(
            `/notifications/${notificationId}`,
            {
                params: { userId }
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Failed to delete notification:", error);
        throw error;
    }
};