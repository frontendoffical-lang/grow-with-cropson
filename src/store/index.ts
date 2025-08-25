import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import productsSlice from './slices/productsSlice';
import cartSlice from './slices/cartSlice';
import uiSlice from './slices/uiSlice';
import testimonialsSlice from './slices/testimonialsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    ui: uiSlice,
    testimonials: testimonialsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;