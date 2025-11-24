import baseApi from "./baseApi";
import { ITemplate } from "./templateApi";
import { IUser } from "./types";

export interface IRating {
    id?: number;
    templateId: number;
    template?: ITemplate;
    userId?: number;
    user?: IUser;
    score: number;  //number star 1-5
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IRatingCreate {
    score: number;
    userId: number;
    templateId: number;
}
export const getAllRatingByTemplateIdAPI = async (templateId: number) => {
    try {
        const { data } = await baseApi.get<IRating[]>(`/ratings/template/${templateId}`)
        return data
    } catch (error: any) {
        throw error
    }
}
export const createRating = async (rating: IRatingCreate) => {
    try {
        const { data } = await baseApi.post<IRating>(`/ratings`, rating)
        return data
    } catch (error: any) {
        throw error
    }
}
export const getRatingByUserId = async (userId: number) => {
    try {
        const { data } = await baseApi.get<IRating[]>(`/ratings/user/${userId}`)
        return data
    } catch (error: any) {
        throw error
    }
}
export const deleteRatingAPI = async (ratingId: number) => {
    try {
        const { data } = await baseApi.delete<IRating>(`/ratings/${ratingId}`)
        return data
    } catch (error: any) {
        throw error
    }
}
export const updateRatingAPI = async (rating: IRating) => {
    try {
        const { data } = await baseApi.put<IRating>(`/ratings/${rating.id}`, rating)
        return data
    } catch (error: any) {
        throw error
    }
}