
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slice/authSlice';
import chatSlice from './Slice/chatSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        chat: chatSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;