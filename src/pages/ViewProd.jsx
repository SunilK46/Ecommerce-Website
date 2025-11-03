import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { viewProducts } from "../products/slice_product/Prod-thunk";

const ViewProd = () => {
  const { product, error, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(viewProducts(id));
    }
  }, [dispatch, id]);

  if (loading) return <h1 className="text-center text-xl mt-10">Loading...</h1>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!product || !product.id) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden max-w-2xl w-full p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-xl w-64 h-64 object-cover border-2 border-gray-200 dark:border-gray-700 shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 capitalize">
                Category: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{product.category}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{product.description}</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">₹ {product.price}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/edit/${id}`}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all"
              >
                EDIT
              </Link>
              <Link
                to={`/delete/${id}`}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all"
              >
                DELETE
              </Link>
              <Link
                to="/"
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProd;