import { configureStore } from '@reduxjs/toolkit';
import authslice from '../redux/authSlice/authslice';

export const store = configureStore({
  reducer: {
    user : authslice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;