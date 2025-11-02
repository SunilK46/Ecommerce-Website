import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addToCart, updateCartQuantity, removeFromCart, clearCart } from "../slice_cart/Cart-Thunks";
import { setToStorage } from '../../common/utils/Storage';
import { CONFIG } from '../../common/constants/config';

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
        quantity += item.quantity;
        amount += item.totalPrice;
      });

      state.totalQuantity = quantity;
      state.totalAmount = amount;
    },
    
    saveCartToStorage: (state) => {
      const cartData = {
        cartItems: state.cartItems,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
        timestamp: new Date().toISOString()
      };
      setToStorage(CONFIG.STORAGE_KEYS.CART, cartData);
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

    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      const existingIndex = state.cartItems.findIndex(
        item => item.productId === action.payload.productId
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateCartQuantity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );
      if (index >= 0) {
        state.cartItems[index] = action.payload;
      }
    });
    builder.addCase(updateCartQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(clearCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.loading = false;
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { calculateTotals, saveCartToStorage } = cartSlice.actions;
export default cartSlice.reducer;