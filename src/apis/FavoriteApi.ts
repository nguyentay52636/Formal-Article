import baseApi from "./baseApi";
import { ITemplate } from "./templateApi";

export interface IFavoriteRecord {
    id: number
    userId: number
    templateId: number
    createdAt?: string
    template?: ITemplate
}

export const getSavedTemplatesByUser = async (userId: number): Promise<ITemplate[]> => {
    if (!userId) return [];
    try {
        const { data } = await baseApi.get(`/users/${userId}/saved-templates`);
        if (!Array.isArray(data)) {
            return [];
        }
        return data as ITemplate[];
    } catch (error) {
        console.error("Error fetching saved templates:", error);
        return [];
    }
}

export const saveTemplateToFavorite = async (userId: number, templateId: number): Promise<IFavoriteRecord | null> => {
    try {
        const { data } = await baseApi.post(`/users/${userId}/saved-templates/${templateId}`);
        return data as IFavoriteRecord;
    } catch (error) {
        console.error("Error saving favorite template:", error);
        throw error;
    }
}

export const removeTemplateFromFavorite = async (userId: number, templateId: number): Promise<void> => {
    try {
        await baseApi.delete(`/users/${userId}/saved-templates/${templateId}`);
    } catch (error) {
        console.error("Error removing favorite template:", error);
        throw error;
    }
}

