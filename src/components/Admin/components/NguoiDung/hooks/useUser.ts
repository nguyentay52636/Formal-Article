import { IUser } from "@/apis/types";
import { createUser, deleteUser as deleteUserApi, getAllUsers, updateUser as updateUserApi } from "@/apis/userApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const useUser = (options?: { fetchOnMount?: boolean }) => {
    const { fetchOnMount = true } = options || {};
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();
            setUsers(response);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    const addUser = async (user: IUser) => {
        setLoading(true);
        try {
            const res = await createUser(user);
            if (res) {
                toast.success("Thêm người dùng thành công");
                if (fetchOnMount) getUsers(); // Refresh if we are managing the list
                return true;
            }
            return false;
        } catch (error) {
            toast.error("Thêm người dùng thất bại");
            return false;
        } finally {
            setLoading(false);
        }
    }

    const updateUser = async (id: number, user: IUser) => {
        setLoading(true);
        try {
            const res = await updateUserApi(id, user);
            if (res) {
                toast.success("Cập nhật người dùng thành công");
                if (fetchOnMount) getUsers();
                return true;
            }
            return false;
        } catch (error) {
            toast.error("Cập nhật người dùng thất bại");
            return false;
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (id: number) => {
        setLoading(true);
        try {
            const res = await deleteUserApi(id);
            if (res) {
                toast.success("Xóa người dùng thành công");
                if (fetchOnMount) getUsers();
                return true;
            }
            return false;
        } catch (error) {
            toast.error("Xóa người dùng thất bại");
            return false;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (fetchOnMount) {
            getUsers();
        }
    }, [fetchOnMount]);

    return { users, loading, error, refresh: getUsers, addUser, updateUser, deleteUser };
}