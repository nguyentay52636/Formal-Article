import { uploadToCloudinary, uploadToLocalStorage } from "@/apis/uploadApi";
import { useState } from "react";

export const useUpload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadWithCloudinary = async (file: File) => {
        try {
            setLoading(true);
            setError(null);

            const data = await uploadToCloudinary(file);
            if (!data) throw new Error("Upload to Cloudinary failed");

            return data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const uploadLocal = async (file: File) => {
        try {
            setLoading(true);
            setError(null);

            const data = await uploadToLocalStorage(file);
            if (!data) throw new Error("Upload to LocalStorage failed");

            return data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { uploadWithCloudinary, uploadLocal, loading, error };
};
