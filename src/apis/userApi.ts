import baseApi from "./baseApi";
import { IUser } from "./types";

const normalizeUserResponse = (payload: any): IUser => ({
    id: payload?.id,
    fullName: payload?.fullName ?? "",
    phone: payload?.phone ?? "",
    email: payload?.email ?? "",
    avatar: payload?.avatar ?? undefined,
    active: payload?.active ?? false,
    roleId: payload?.role?.id ?? payload?.roleId,
    role: payload?.role,
    createdAt: payload?.createdAt ?? undefined,
    updatedAt: payload?.updatedAt ?? undefined,
});

export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        const { data } = await baseApi.get("/users");
        if (!Array.isArray(data)) {
            return [];
        }
        return data.map(normalizeUserResponse);
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export const getUserById = async (id: number): Promise<IUser | null> => {
    try {
        const { data } = await baseApi.get(`/users/${id}`);
        if (!data) return null;
        return normalizeUserResponse(data);
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

export const createUser = async (user: Partial<IUser>) => {
    try {
        console.log("📤 Creating user payload:", user);
        const { data } = await baseApi.post("/users", user);
        return data ? normalizeUserResponse(data) : null;
    } catch (error: any) {
        console.error("❌ Error creating user:", error);
        if (error.response) {
            console.error("❌ Server response error data:", error.response.data);
            console.error("❌ Server response status:", error.response.status);
        }
        return null;
    }
}

export const updateUser = async (id: number, user: Partial<IUser>) => {
    try {
        console.log(`📤 Updating user ${id} payload:`, user);
        const { data } = await baseApi.put(`/users/${id}`, user);
        return data ? normalizeUserResponse(data) : null;
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

export const getUserByRoleId = async (roleId: number): Promise<IUser[]> => {
    try {
        const { data } = await baseApi.get(`/users/role/${roleId}`);
        if (!Array.isArray(data)) {
            return [];
        }
        return data.map(normalizeUserResponse);
    } catch (error) {
        console.error("Error fetching users by role:", error);
        return [];
    }
}
