
export const selectCartItems = (state) => state.cart.cartItems;


export const selectCartLoading = (state) => state.cart.loading;

export const selectCartError = (state) => state.cart.error;

export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;

export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export const selectIsCartEmpty = (state) => state.cart.cartItems.length === 0;

export const selectCartItemCount = (state) => state.cart.cartItems.length;

export const selectIsProductInCart = (state, productId) => {
  return state.cart.cartItems.some(item => item.productId === productId);
};

export const selectCartItemByProductId = (state, productId) => {
  return state.cart.cartItems.find(item => item.productId === productId);
};

export default {
  selectCartItems,
  selectCartLoading,
  selectCartError,
  selectCartTotalQuantity,
  selectCartTotalAmount,
  selectIsCartEmpty,
  selectCartItemCount,
  selectIsProductInCart,
  selectCartItemByProductId
};