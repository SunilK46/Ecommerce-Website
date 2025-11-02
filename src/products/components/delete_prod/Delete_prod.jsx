import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProducts } from '../../slice_product/Prod-thunk';
import { showSuccessToast, showErrorToast } from '../../../common/utils/ToastConfig';
import { TEXT } from '../../../common/constants/textConstants';
import Button from '../../../common/ui/Button';
import Loader from '../../../common/ui/Loader';

const Delete_prod = () => {
  const { loading, error } = useSelector((state) => state.products);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (id) {
      try {
        await dispatch(deleteProducts(id)).unwrap();
        showSuccessToast(TEXT.PRODUCT_DELETED);
        navigate('/');
      } catch (error) {
        showErrorToast(TEXT.ERROR_OCCURRED);
      }
    }
  };

  if (loading) return <Loader fullScreen text="Deleting product..." />;
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-center text-red-600 text-xl">{error}</h1>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Delete Product
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {TEXT.PRODUCT_DELETE_CONFIRM}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleDelete}
            variant="danger"
            size="lg"
            className="flex-1"
          >
            {TEXT.BTN_YES_DELETE}
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            {TEXT.BTN_CANCEL}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Delete_prod;