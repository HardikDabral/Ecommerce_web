import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { id, title, price, description, images, rating, category, brand, stock } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, title, price, description, images, rating, category, brand, stock, quantity: 1 });
      }

      state.totalItems += 1;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;

 