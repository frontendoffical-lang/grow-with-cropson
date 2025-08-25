import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface CartItem {
  id: string;
  name: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
  notes: string;
}

const initialState: CartState = {
  items: [],
  drawerOpen: false,
  notes: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.qty = Math.max(0, action.payload.qty);
        if (item.qty === 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.notes = '';
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
  },
});

export const { 
  addItem, 
  removeItem, 
  updateQty, 
  clearCart, 
  toggleDrawer, 
  setDrawerOpen,
  setNotes 
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.qty, 0);
export const selectCartDrawerOpen = (state: RootState) => state.cart.drawerOpen;
export const selectCartNotes = (state: RootState) => state.cart.notes;

export default cartSlice.reducer;