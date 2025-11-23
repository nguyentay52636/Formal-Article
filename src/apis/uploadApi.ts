import baseApi from "./baseApi";

export const uploadToCloudinary = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await baseApi.post("/files/upload", formData);
        if (!data) throw new Error("Upload to Cloudinary failed");

        return data;
    } catch (error: any) {
        return null;
    }
}
export const uploadToLocalStorage = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await baseApi.post("/files/image", formData);
        if (!data) throw new Error("Upload to LocalStorage failed");

        return data;
    } catch (error: any) {
        return null;
    }
}