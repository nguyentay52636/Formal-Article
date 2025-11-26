import baseApi from "./baseApi";
import { IUser } from "./types";

export const getAllUsers = async () => {
    try {
        const { data } = await baseApi.get("/users");
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export const getUserById = async (id: number) => {
    try {
        const { data } = await baseApi.get(`/users/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

export const createUser = async (user: IUser) => {
    try {
        console.log("📤 Creating user payload:", user);
        const { data } = await baseApi.post("/users", user);
        return data;
    } catch (error: any) {
        console.error("❌ Error creating user:", error);
        if (error.response) {
            console.error("❌ Server response error data:", error.response.data);
            console.error("❌ Server response status:", error.response.status);
        }
        return null;
    }
}

export const updateUser = async (id: number, user: IUser) => {
    try {
        console.log(`📤 Updating user ${id} payload:`, user);
        const { data } = await baseApi.put(`/users/${id}`, user);
        return data;
    } catch (error: any) {
        console.error("❌ Error updating user:", error);
        if (error.response) {
            console.error("❌ Server response error data:", error.response.data);
            console.error("❌ Server response status:", error.response.status);
        }
        return null;
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await baseApi.delete(`/users/${id}`);
        // DELETE endpoint returns 204 No Content (no body), so success is indicated by status
        return response.status === 204 || response.status === 200;
    } catch (error: any) {
        console.error("Error deleting user:", error);
        if (error.response) {
            console.error("❌ Server response error data:", error.response.data);
            console.error("❌ Server response status:", error.response.status);
        }
        throw error; // Re-throw to let caller handle
    }
}

export const getUserByRoleId = async (roleId: number) => {
    try {
        const { data } = await baseApi.get(`/users/role/${roleId}`);
        return data;
    } catch (error) {
        console.error("Error fetching users by role:", error);
        return [];
    }
}
