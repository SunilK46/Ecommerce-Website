import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  fetchCart, 
  updateCartQuantity, 
  removeFromCart, 
  clearCart 
} from '../cart/slice_cart/Cart-Thunks';
import { calculateTotals, saveCartToStorage } from '../cart/slice_cart/CartSlice';
import { showSuccessToast, showWarningToast, showErrorToast } from '../common/utils/ToastConfig';
import { TEXT } from '../common/constants/TextConstants';
import { formatCurrency } from '../common/utils/Formatters';
import Loader from '../common/ui/Loader';
import Button from '../common/ui/Button';

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
      showWarningToast(`${title} ${TEXT.CART_ITEM_REMOVED}`);
    });
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the entire cart?')) {
      dispatch(clearCart()).then(() => {
        showSuccessToast(TEXT.CART_CLEARED);
      });
    }
  };

  const handleSaveCart = () => {
    dispatch(saveCartToStorage());
    showSuccessToast(TEXT.CART_SAVED);
  };

  if (loading) return <Loader fullScreen text={TEXT.LOADING_CART} />;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-2xl text-red-500">{TEXT.ERROR_LOADING_CART}: {error}</h1>
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
            {TEXT.CART_EMPTY}
          </h1>
          <Link to="/">
            <Button variant="primary" size="lg">
              {TEXT.BTN_CONTINUE_SHOPPING}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {TEXT.PAGE_SHOPPING_CART} ({totalQuantity} {TEXT.CART_ITEMS_COUNT})
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={handleSaveCart}
            variant="success"
            size="md"
          >
            💾 {TEXT.BTN_SAVE_CART}
          </Button>
          <Button
            onClick={handleClearCart}
            variant="danger"
            size="md"
          >
            {TEXT.BTN_CLEAR_CART}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.category}
                </p>
                <p className="text-blue-600 font-bold mt-2">
                  {formatCurrency(item.price)}
                </p>

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

              <div className="flex flex-col justify-between items-end">
                <button
                  onClick={() => handleRemove(item.id, item.title)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  ✕ {TEXT.BTN_REMOVE}
                </button>
                <p className="font-bold text-lg text-gray-800 dark:text-white">
                  {formatCurrency(item.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              {TEXT.ORDER_SUMMARY}
            </h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{TEXT.CART_SUBTOTAL} ({totalQuantity} items):</span>
                <span className="font-semibold">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{TEXT.CART_SHIPPING}:</span>
                <span className="text-green-600 font-semibold">{TEXT.CART_FREE_SHIPPING}</span>
              </div>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                <span>{TEXT.CART_TOTAL}:</span>
                <span className="text-blue-600">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full mb-3"
            >
              {TEXT.BTN_PROCEED_CHECKOUT}
            </Button>
            
            <Link to="/" className="block text-center">
              <Button variant="outline" size="md" className="w-full">
                {TEXT.BTN_CONTINUE_SHOPPING}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;