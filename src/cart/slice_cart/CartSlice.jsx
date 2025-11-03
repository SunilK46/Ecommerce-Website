import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addToCart, updateCartQuantity, removeFromCart, clearCart } from "./Cart-Thunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    totalQuantity: 0,
    totalAmount: 0
  },
  reducers: {
    calculateTotals: (state) => {
      let quantity = 0;
      let amount = 0;

      state.cartItems.forEach(item => {
        quantity += Number(item.quantity) || 0;
        amount += (Number(item.price) || 0) * (Number(item.quantity) || 0);
      });

      state.totalQuantity = quantity;
      state.totalAmount = amount;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        item => item.productId === action.payload.productId
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
    });

    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      const index = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );
      if (index >= 0) {
        state.cartItems[index] = action.payload;
      }
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
    });

    builder.addCase(clearCart.fulfilled, (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    });
  }
});

export const { calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;