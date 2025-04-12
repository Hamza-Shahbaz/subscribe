import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';

// Configure store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;