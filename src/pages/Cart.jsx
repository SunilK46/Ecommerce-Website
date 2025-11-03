import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  fetchCart, 
  updateCartQuantity, 
  removeFromCart, 
  clearCart 
} from '../cart/slice_cart/Cart-Thunks';
import { calculateTotals } from '../cart/slice_cart/CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error, totalQuantity, totalAmount } = useSelector(
    state => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart()).then(() => {
      dispatch(calculateTotals());
    });
  }, [dispatch]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    
    dispatch(updateCartQuantity({
      id: item.id,
      quantity: newQuantity,
      price: item.price
    })).then(() => {
      dispatch(fetchCart()).then(() => {
        dispatch(calculateTotals());
      });
    });
  };

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id)).then(() => {
      dispatch(calculateTotals());
      alert(`${title} removed from cart`);
    });
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the entire cart?')) {
      dispatch(clearCart()).then(() => {
        alert('Cart cleared successfully!');
      });
    }
  };

  const handleSaveCart = () => {
    alert('Cart saved successfully!');
  };

  if (loading) return <h1 className="text-center text-2xl mt-10">Loading cart...</h1>;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-2xl text-red-500">{error}</h1>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Your Cart is Empty
          </h1>
          <Link to="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Shopping Cart ({totalQuantity} items)
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleSaveCart}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            💾 Save Cart
          </button>
          <button
            onClick={handleClearCart}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.category}
                </p>
                <p className="text-blue-600 font-bold mt-2">
                  ₹{Number(item.price || 0).toLocaleString('en-IN')}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded hover:bg-gray-300 dark:hover:bg-gray-600 font-bold"
                  >
                    -
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded hover:bg-gray-300 dark:hover:bg-gray-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button & Total Price */}
              <div className="flex flex-col justify-between items-end">
                <button
                  onClick={() => handleRemove(item.id, item.title)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  ✕ Remove
                </button>
                <p className="font-bold text-lg text-gray-800 dark:text-white">
                  ₹{Number(item.totalPrice || 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal ({totalQuantity} items):</span>
                <span className="font-semibold">₹{Number(totalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                <span>Total:</span>
                <span className="text-blue-600">₹{Number(totalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mb-3 font-semibold">
              Proceed to Checkout
            </button>
            
            <Link to="/" className="block text-center">
              <button className="w-full bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;