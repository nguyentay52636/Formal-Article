import baseApi from "./baseApi";
import { ITemplate } from "./templateApi";
import { IUser } from "./types";

export interface IFavorite {
    id: number
    userId: number
    user?: IUser
    templateId: number
    template?: ITemplate
    createdAt?: string
    updatedAt?: string
}

export const getFavoritesByUserId = async (userId: number): Promise<IFavorite[]> => {
    if (!userId) return [];
    try {
        const { data } = await baseApi.get(`/favourite-cvs/user/${userId}`);
        if (!Array.isArray(data)) {
            return [];
        }
        return data as IFavorite[];
    } catch (error) {
        console.error("Error fetching favorite CVs:", error);
        return [];
    }
}

export const getFavoriteById = async (id: number): Promise<IFavorite | null> => {
    try {
        const { data } = await baseApi.get(`/favourite-cvs/${id}`);
        return data as IFavorite;
    } catch (error) {
        console.error("Error fetching favorite CV:", error);
        return null;
    }
}

// Tạo CV yêu thích mới
export const createFavorite = async (userId: number, templateId: number): Promise<IFavorite | null> => {
    try {
        const { data } = await baseApi.post(`/favourite-cvs`, {
            userId,
            templateId
        });
        return data as IFavorite;
    } catch (error) {
        console.error("Error creating favorite CV:", error);
        throw error;
    }
}

export const deleteFavorite = async (id: number): Promise<void> => {
    try {
        await baseApi.delete(`/favourite-cvs/${id}`);
    } catch (error) {
        console.error("Error deleting favorite CV:", error);
        throw error;
    }
}