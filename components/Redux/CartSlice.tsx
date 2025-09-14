import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//defines what properties and its types
interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

//Provide initial state and reducers function how state changes for specific actions
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state:any,
      action: PayloadAction<Omit<CartItem, 'quantity'>>
    ) => {
      // Check if already in cart
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // update totals
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },

    incrementQuantity: (state:any, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += item.price;
      }
    },

    decrementQuantity: (state:any, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= item.price;

        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== item.id);
        }
      }
    },

    clearCart: (state:any) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});


export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
