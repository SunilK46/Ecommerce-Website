import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api_config/AxiosInstance";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await api.get('/cart');
  return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (product) => {
  const cartResponse = await api.get('/cart');
  const existingItem = cartResponse.data.find(
    item => item.productId === product.id
  );

  if (existingItem) {
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
      totalPrice: existingItem.price * (existingItem.quantity + 1)
    };
    const response = await api.put(`/cart/${existingItem.id}`, updatedItem);
    return response.data;
  } else {
    const newItem = {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
      totalPrice: product.price
    };
    const response = await api.post('/cart', newItem);
    return response.data;
  }
});

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity, price }) => {
    const updatedItem = {
      quantity: quantity,
      totalPrice: price * quantity
    };
    const response = await api.patch(`/cart/${id}`, updatedItem);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    await api.delete(`/cart/${id}`);
    return id;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const cartResponse = await api.get('/cart');
  const deletePromises = cartResponse.data.map(item => 
    api.delete(`/cart/${item.id}`)
  );
  await Promise.all(deletePromises);
  return;
});