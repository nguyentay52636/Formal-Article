import baseApi from "./baseApi";
import { ITag } from "./types";

export const getAllTags = async (): Promise<ITag[]> => {
    try {
        const { data } = await baseApi.get("/tags");
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}

export const getTagsById = async (id: number): Promise<ITag | null> => {
    try {
        const { data } = await baseApi.get(`/tags/${id}`);
        return data ?? null;
    } catch (error) {
        console.error("Error fetching tag:", error);
        return null;
    }
}

export const deleteTag = async (id: number): Promise<boolean> => {
    try {
        const response = await baseApi.delete(`/tags/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error("Error deleting tag:", error);
        throw error;
    }
}

type TagPayload = Pick<ITag, "name" | "slug" | "type">

export const updateTag = async (id: number, tag: TagPayload): Promise<ITag | null> => {
    try {
        const { data } = await baseApi.put(`/tags/${id}`, tag);
        return data ?? null;
    } catch (error) {
        console.error("Error updating tag:", error);
        throw error;
    }
}

export const createTag = async (tag: TagPayload): Promise<ITag | null> => {
    try {
        const { data } = await baseApi.post("/tags", tag);
        return data ?? null;
    } catch (error) {
        console.error("Error creating tag:", error);
        throw error;
    }
}

export const getListByTags = async (typeTag: string): Promise<ITag[]> => {
    try {
        const { data } = await baseApi.get(`/tags/type/${typeTag}`);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}