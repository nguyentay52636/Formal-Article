import baseApi from "./baseApi";
import { IMessage } from "./types";

export const messageApi = {
    getRoomMessages: async (roomId: string) => {
        const response = await baseApi.get<IMessage[]>(`/chat/rooms/${roomId}/messages`);
        return response.data;
    },

    createRoom: async (userId: number, adminId: number) => {
        const response = await baseApi.post(`/chat/rooms?userId=${userId}&adminId=${adminId}`);
        return response.data;
    }
};
export const getAllMessageByRoomId = async (roomId: string) => {
    try {
        const response = await baseApi.get<IMessage[]>(`/chat/rooms/${roomId}/messages`);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}