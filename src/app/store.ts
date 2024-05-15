import { configureStore } from '@reduxjs/toolkit';
import authslice from '../scenes/user/authSlice/authslice';
import companyslice from '../scenes/company/companyRedux/companyslice';
import  userSlice  from '../scenes/user/userSlice/userslice';
import categorySlice from '../scenes/category/categorySlice/categorySlice';

export const store = configureStore({
  reducer: {
    user : authslice,
    company : companyslice,
    userbyrole : userSlice,
    category : categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;