import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

//configureStore to create redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
