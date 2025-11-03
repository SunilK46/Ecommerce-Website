import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProducts, viewProducts } from "../../slice_product/Prod-thunk";

const Edit_prod = () => {
  const { product = {}, loading, error } = useSelector((state) => state.products);
  const [state, setState] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(viewProducts(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.id) setState(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProducts({ id, ...state }));
    alert("Product updated successfully!");
    navigate("/");
  };

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (error) return <h2 className="text-center text-red-500 mt-10">{error}</h2>;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Edit Product
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Enter product title"
          value={state.title || ""}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={state.price || ""}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          name="category"
          placeholder="Enter category"
          value={state.category || ""}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />

        <textarea
          name="description"
          placeholder="Enter description"
          value={state.description || ""}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        ></textarea>

        <input
          type="text"
          name="image"
          placeholder="Enter image URL"
          value={state.image || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit_prod;