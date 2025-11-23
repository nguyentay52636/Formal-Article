import baseApi from "./baseApi";

export const getAllTags = async () => {
    try {
        const { data } = await baseApi.get("/tags");
        return data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}