import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser, RegisterDTO } from "@/apis/types";
import { LoginAPI, registerAPI } from "@/apis/authApi";

interface AuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    registrationSuccess: boolean;
}

const getFromLocalStorage = (key: string, defaultValue: string) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
};

const parseLocalStorageData = (key: string, defaultValue: any) => {
    try {
        const data = getFromLocalStorage(key, JSON.stringify(defaultValue));
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
};

const initialState: AuthState = {
    user: parseLocalStorageData("currentUser", null),
    token: getFromLocalStorage("token", ""),
    isAuthenticated:
        parseLocalStorageData("isAuthenticated", false) &&
        !!parseLocalStorageData("currentUser", null) &&
        !!getFromLocalStorage("token", ""),
    isLoading: false,
    error: null,
    registrationSuccess: false,
};

// LOGIN
export const loginThunk = createAsyncThunk(
    "auth/login",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await LoginAPI({ email, password });
            return response;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (
        { email, password, fullName, phone }: RegisterDTO,
        { rejectWithValue }
    ) => {
        try {
            const response = await registerAPI({ email, fullName, password, phone });
            return response;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.reload();
            }
        },
        setCredentials: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false;

                const user = action.payload?.user;
                const token = action.payload?.token;

                if (user && token) {
                    state.user = user;
                    state.token = token;
                    state.isAuthenticated = true;

                    localStorage.setItem("currentUser", JSON.stringify(user));
                    localStorage.setItem("token", token);
                    localStorage.setItem("isAuthenticated", "true");
                } else {
                    state.error = "Invalid login data";
                }
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            })

            // REGISTER
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.registrationSuccess = true;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.registrationSuccess = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, setCredentials, clearError, resetRegistrationSuccess } =
    authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
