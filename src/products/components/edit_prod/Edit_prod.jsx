import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProducts, viewProducts } from "../../slice_product/Prod-thunk";
import { validateProductForm } from "../../../common/utils/validators";
import { showSuccessToast, showErrorToast } from "../../../common/utils/ToastConfig";
import { TEXT } from "../../../common/constants/textConstants";
import Input from "../../../common/ui/Input";
import Button from "../../../common/ui/Button";
import Loader from "../../../common/ui/Loader";

const Edit_prod = () => {
  const { product = {}, loading, error } = useSelector((state) => state.products);
  const [state, setState] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateProductForm(state);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      showErrorToast("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(editProducts({ id, ...state })).unwrap();
      showSuccessToast(TEXT.PRODUCT_UPDATED);
      navigate("/");
    } catch (error) {
      showErrorToast(TEXT.ERROR_OCCURRED);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen text={TEXT.LOADING} />;
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <h2 className="text-red-500 text-xl">{error}</h2>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
          {TEXT.PAGE_EDIT_PRODUCT}
        </h2>

        <Input
          type="text"
          name="title"
          label={TEXT.FORM_TITLE_LABEL}
          placeholder={TEXT.FORM_TITLE_PLACEHOLDER}
          value={state.title || ""}
          onChange={handleChange}
          error={errors.title}
          required
        />

        <Input
          type="number"
          name="price"
          label={TEXT.FORM_PRICE_LABEL}
          placeholder={TEXT.FORM_PRICE_PLACEHOLDER}
          value={state.price || ""}
          onChange={handleChange}
          error={errors.price}
          required
        />

        <Input
          type="text"
          name="category"
          label={TEXT.FORM_CATEGORY_LABEL}
          placeholder={TEXT.FORM_CATEGORY_PLACEHOLDER}
          value={state.category || ""}
          onChange={handleChange}
          error={errors.category}
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {TEXT.FORM_DESCRIPTION_LABEL}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            name="description"
            placeholder={TEXT.FORM_DESCRIPTION_PLACEHOLDER}
            value={state.description || ""}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <Input
          type="text"
          name="image"
          label={TEXT.FORM_IMAGE_LABEL}
          placeholder={TEXT.FORM_IMAGE_PLACEHOLDER}
          value={state.image || ""}
          onChange={handleChange}
          error={errors.image}
        />

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="flex-1"
          >
            {TEXT.BTN_UPDATE}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => navigate("/")}
            className="flex-1"
          >
            {TEXT.BTN_CANCEL}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edit_prod;