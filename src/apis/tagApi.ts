import baseApi from "./baseApi";
import { ITag } from "./types";

export const getAllTags = async () => {
    try {
        const { data } = await baseApi.get("/tags");
        return data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}
export const getTagsById = async (id: number) => {
    try {
        const { data } = await baseApi.get(`/tags/${id}`);
        return data;
    } catch (error) {
        return null;
    }
}
export const deleteTag = async (id: number) => {
    try {
        const { data } = await baseApi.delete(`/tags/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting tag:", error);
        return null;
    }
}
export const updateTag = async (id: number, tag: ITag) => {
    try {
        const { data } = await baseApi.put(`/tags/${id}`, tag);
        return data;
    } catch (error) {
        console.error("Error updating tag:", error);
        return null;
    }
}
export const createTag = async (tag: ITag) => {
    try {
        const { data } = await baseApi.post("/tags", tag);
        return data;
    } catch (error) {
        console.error("Error creating tag:", error);
        return null;
    }
}
export const getListByTags = async (typeTag: string) => {
    const tags = ["job_field", "position", "design"];
    try {
        const { data } = await baseApi.get(`/tags/type/${typeTag}`);
        return data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}