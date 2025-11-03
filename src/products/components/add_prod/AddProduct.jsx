import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../../slice_product/Prod-thunk";
import { showSuccessToast } from "../../../common/utils/ToastConfig";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProducts(form));
    showSuccessToast("Product added successfully!");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
          Add New Product
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Enter product title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          name="category"
          placeholder="Enter category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />

        <textarea
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        ></textarea>

        <input
          type="text"
          name="image"
          placeholder="Enter image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;