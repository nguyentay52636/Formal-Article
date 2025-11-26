import baseApi from "./baseApi";
import { IRole } from "./types";

export const getAllRoles = async () => {
    try {
        const { data } = await baseApi.get("/roles");
        return data;
    } catch (error) {
        console.error("Error fetching roles:", error);
        return [];
    }
}
