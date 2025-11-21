import baseApi from "./baseApi";
import { IMessage } from "./types";

export const getHistoryChat = async (roomId: string) => {
    try {
        const { data } = await baseApi.get<IMessage[]>(`/chat/rooms/${roomId}/messages`);
        return data;
    } catch (error: any) {
        throw error;
    }
}
interface UpdateMessageDto {
    additionalProp1: string,
    additionalProp2: string,
    additionalProp3: string
}
export const updateMessage = async (messageId: string, {
    additionalProp1,
    additionalProp2,
    additionalProp3
}: UpdateMessageDto) => {
    const newMessage = {
        additionalProp1,
        additionalProp2,
        additionalProp3
    }
    try {
        const { data } = await baseApi.put(`/chat/rooms/${messageId}`, newMessage);
        return data;
    } catch (error: any) {
        throw error;
    }
}
export interface SendMessageDto {
    content?: string;
    type?: string;
    fileUrl?: string;
    fileSize?: number;
    fileMime?: string;
    replyToId?: number | null;
}

export const sendMessage = async (
    roomId: string,
    senderId: number,
    message: SendMessageDto
) => {
    try {
        const { data } = await baseApi.post(
            `/chat/rooms/${roomId}/send?senderId=${senderId}`,
            message
        );
        return data;
    } catch (error: any) {
        throw error;
    }
};



export const deleteMessage = async (messageId: number) => {
    try {
        const { data } = await baseApi.delete(`/chat/messages/${messageId}`);
        return data;
    } catch (error: any) {
        throw error;
    }
}