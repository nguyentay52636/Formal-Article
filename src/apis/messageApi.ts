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