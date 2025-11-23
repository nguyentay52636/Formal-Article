import baseApi from "./baseApi";
import { ITag } from "./types";

export interface ITemplate {
    id?: number;
    name: string;
    slug: string;
    summary: string;
    html: string
    css: string
    previewUrl: string;
    views: number;
    downloads: number;
    tag: ITag
    createdAt: string;
    updatedAt: string;
}
export const getAllTemplates = async () => {
    try {
        const { data } = await baseApi.get("/templates");
        return data;
    } catch (error) {
        console.error("Error fetching templates:", error);
        return [];
    }
}
export const getTemplateById = async (id: number) => {
    try {
        const { data } = await baseApi.get(`/templates/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching template:", error);
        return null;
    }
}
export const createTemplate = async (template: ITemplate) => {
    try {
        const { data } = await baseApi.post("/templates", template);
        return data;
    } catch (error) {
        console.error("Error creating template:", error);
        return null;
    }
}
export const updateTemplate = async (id: number, template: ITemplate) => {
    try {
        const { data } = await baseApi.put(`/templates/${id}`, template);
        return data;
    } catch (error) {
        console.error("Error updating template:", error);
        return null;
    }
}
export const deleteTemplate = async (id: number) => {
    try {
        const { data } = await baseApi.delete(`/templates/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting template:", error);
        return null;
    }
}
export const getTemplateByTagId = async (tagId: number) => {
    try {
        const { data } = await baseApi.get(`/templates/tag/${tagId}`);
        return data;
    } catch (error) {
        console.error("Error fetching templates by tag:", error);
        return [];
    }
}
export const increaseViewTemplate = async (id: number) => {
    try {
        const { data } = await baseApi.post(`/templates/${id}/views`);
        return data;
    } catch (error) {
        console.error("Error increasing view template:", error);
        return null;
    }
}
export const increaseDownloadTemplate = async (id: number) => {
    try {
        const { data } = await baseApi.post(`/templates/${id}/downloads`);
        return data;
    } catch (error) {
        console.error("Error increasing download template:", error);
        return null;
    }
}


