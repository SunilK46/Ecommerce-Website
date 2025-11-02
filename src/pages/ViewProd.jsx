import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { viewProducts } from "../products/slice_product/Prod-thunk";
import { addToCart } from "../cart/slice_cart/Cart-Thunks";
import { calculateTotals } from "../cart/slice_cart/CartSlice";
import { showSuccessToast } from "../common/utils/ToastConfig";
import { TEXT } from "../common/constants/textConstants";
import { formatCurrency } from "../common/utils/formatters";
import Button from "../common/ui/Button";
import Loader from "../common/ui/Loader";

const ViewProd = () => {
  const { product, error, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(viewProducts(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product)).then(() => {
      dispatch(calculateTotals());
      showSuccessToast(`${product.title} ${TEXT.CART_ITEM_ADDED}`);
    });
  };

  if (loading) return <Loader fullScreen text={TEXT.LOADING} />;
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-center text-red-500 text-xl">{error}</p>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-xl w-full max-w-md h-auto object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title}
              </h1>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleAddToCart}
                variant="success"
                size="lg"
                className="w-full"
              >
                🛒 {TEXT.BTN_ADD_TO_CART}
              </Button>
              
              <Link to={`/edit/${id}`} className="w-full">
                <Button variant="primary" size="lg" className="w-full">
                  ✏️ {TEXT.BTN_EDIT}
                </Button>
              </Link>
              
              <Link to={`/delete/${id}`} className="w-full">
                <Button variant="danger" size="lg" className="w-full">
                  🗑️ {TEXT.BTN_DELETE}
                </Button>
              </Link>
              
              <Link to="/" className="w-full">
                <Button variant="outline" size="lg" className="w-full">
                  ← {TEXT.BTN_BACK}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProd;