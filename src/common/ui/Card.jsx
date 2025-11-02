import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../cart/slice_cart/Cart-Thunks';
import { calculateTotals } from '../../cart/slice_cart/CartSlice';
import { showErrorToast, showSuccessToast } from '../utils/ToastConfig';
import { TEXT } from '../constants/TextConstants';
import { formatCurrency } from '../utils/Formatters';

const Card = ({ productCard }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addToCart(product)).then(() => {
      dispatch(calculateTotals());
      showSuccessToast(`${product.title} ${TEXT.CART_ITEM_ADDED}`);
    }).catch(() => {
      showErrorToast(TEXT.ERROR_OCCURRED);
    });
  };

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productCard?.map((product) => (
          <div key={product.id} className="relative group">
            <Link to={`/view/${product.id}`}>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
              rounded-xl overflow-hidden shadow-md hover:shadow-2xl 
              transform hover:-translate-y-2 transition-all duration-300 h-[450px] flex flex-col">
                
                <div className="relative overflow-hidden h-60">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 mb-2">
                    {product.title}
                  </h2>
                  
                  <p className="text-blue-600 font-bold text-xl mb-2">
                    {formatCurrency(product.price)}
                  </p>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 flex-1">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
            
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="absolute bottom-4 left-4 right-4 bg-blue-600 hover:bg-blue-700 
              text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 
              shadow-lg hover:shadow-xl transform hover:scale-105
              opacity-0 group-hover:opacity-100"
            >
              🛒 {TEXT.BTN_ADD_TO_CART}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;