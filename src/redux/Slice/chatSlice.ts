import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ChatState {
    isOpen: boolean;
    chatType: 'ai' | 'admin';
    activeRoomId: string | null;
}

const initialState: ChatState = {
    isOpen: false,
    chatType: 'ai',
    activeRoomId: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        openChat: (state, action: PayloadAction<'ai' | 'admin'>) => {
            state.isOpen = true;
            state.chatType = action.payload;
        },
        closeChat: (state) => {
            state.isOpen = false;
        },
        setChatType: (state, action: PayloadAction<'ai' | 'admin'>) => {
            state.chatType = action.payload;
        },
        setActiveRoomId: (state, action: PayloadAction<string | null>) => {
            state.activeRoomId = action.payload;
        },
        toggleChat: (state) => {
            state.isOpen = !state.isOpen;
        }
    },
});

export const { openChat, closeChat, setChatType, setActiveRoomId, toggleChat } = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export default chatSlice.reducer;
