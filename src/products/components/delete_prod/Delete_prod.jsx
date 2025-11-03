import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProducts } from '../../slice_product/Prod-thunk';

const Delete_prod = () => {
  const { loading, error } = useSelector((state) => state.products);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (id) {
      dispatch(deleteProducts(id));
      alert("Product deleted successfully!");
      navigate('/');
    }
  };

  if (loading) return <h1 className="text-center mt-6">Deleting...</h1>;
  if (error) return <h1 className="text-center mt-6 text-red-600">{error}</h1>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Really want to delete this product?
      </h1>

      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Yes, Delete
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Delete_prod;