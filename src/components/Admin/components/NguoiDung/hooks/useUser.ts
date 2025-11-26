import { IUser } from "@/apis/types";
import { getAllUsers } from "@/apis/userApi";
import { useEffect, useState } from "react";

export const useUser = (options?: { fetchOnMount?: boolean }) => {
    const { fetchOnMount = true } = options || {};
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();

            // Check if response has a data property (common API pattern)
            let usersList = response;
            if (response && typeof response === 'object' && 'data' in response) {
                usersList = response.data;
            }

            // Ensure usersList is an array
            if (Array.isArray(usersList)) {
                setUsers(usersList);
            } else {
                console.error("getAllUsers did not return an array:", response);
                setUsers([]);
            }
        } catch (error) {
            console.error("Error in getUsers:", error);
            setError(error as string);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (fetchOnMount) {
            getUsers();
        }
    }, [fetchOnMount]);

    return { users, loading, error, refresh: getUsers };
}