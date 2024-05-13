import { configureStore } from '@reduxjs/toolkit';
import authslice from '../redux/authSlice/authslice';
import companyslice from '../scenes/company/companyRedux/companyslice';

export const store = configureStore({
  reducer: {
    user : authslice,
    company : companyslice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;