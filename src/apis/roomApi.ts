import baseApi from "./baseApi"
import { IRoom } from "./types";
interface CreateRoomDto {
    userId: number;
    roomType: 'user-admin' | 'user-ai';
    initialMessage?: string;
}

export const createRoomAPI = async ({ userId, roomType, initialMessage }: CreateRoomDto) => {
    try {
        const { data } = await baseApi.post("/room-chats", { userId, roomType, initialMessage });
        return data;
    } catch (error: any) {
        throw error;
    }
};
export const getListChatByUserId = async (userId: number) => {
    try {
        const { data } = await baseApi.get<IRoom[]>(`/room-chats?userId=${userId}`);
        return data;
    } catch (error: any) {
        throw error;
    }
}
export const getListChatByStatus = async (status: string) => {
    try {
        const { data } = await baseApi.get<IRoom[]>(`/room-chats?status=${status}`);
        return data;
    } catch (error: any) {
        throw error;
    }
}
export const getAllRoomChat = async () => {
    try {
        const { data } = await baseApi.get<IRoom[]>("/room-chats");
        return data;
    } catch (error: any) {
        throw error;
    }
};
export const getRoomChatPending = async () => {
    try {
        const { data } = await baseApi.get<IRoom[]>("/room-chats/pending");
        return data;
    } catch (error: any) {
        throw error;
    }
}
interface ApproveRoomPayload {
    roomId: string;
    adminId: number;
}

export const browseRoomChat = async (roomId: string, adminId: number) => {
    try {
        const response = await baseApi.put(
            `/room-chats/${roomId}/approve`,
            null,
            { params: { adminId } }
        );
        return response.data;
    } catch (error: any) {
        console.error("Approve room error:", error);
        throw new Error(error?.response?.data?.message || "Không duyệt được phòng chat");
    }
};

export const closeRoomChat = async (roomId: string) => {
    try {
        const { data } = await baseApi.put(`/room-chats/${roomId}/close`);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};
export const deleteRoomChat = async (roomId: string) => {
    try {
        const { data } = await baseApi.delete(`/room-chats/${roomId}`);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}