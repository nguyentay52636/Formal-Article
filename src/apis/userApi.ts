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
        const { data } = await baseApi.post("/users", user);
        return data;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}
export const updateUser = async (id: number, user: IUser) => {
    try {
        const { data } = await baseApi.put(`/users/${id}`, user);
        return data;
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
}
export const deleteUser = async (id: number) => {
    try {
        const { data } = await baseApi.delete(`/users/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        return null;
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
 