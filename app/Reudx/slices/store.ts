// src/redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {api} from '../../uikit/UikitUtils/Apiconfig'; // Import your RTK Query API

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer, // Add API reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware), // Add API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
