import React, { useEffect, useState, useRef } from "react"; // Import useRef
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProducts, viewProducts } from "../../products/slice_product/Prod-thunk";
import { validateProductForm } from "../../../src/common/utils/Validators";
import { showSuccessToast, showErrorToast } from "../../../src/common/utils/ToastConfig";
import { TEXT } from "../../common/constants/TextConstants";
import Input from "../../common/ui/Input";
import Button from "../../../src/common/ui/Button";
import Loader from "../../../src/common/ui/Loader";

const Edit_prod = () => {
  const { product, loading, error } = useSelector((state) => state.products); // Remove default empty object
  const [state, setState] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isProductLoaded = useRef(false); // To track if product has been loaded into local state

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch product once when component mounts or ID changes
  useEffect(() => {
    if (id) {
      isProductLoaded.current = false; // Reset when ID changes
      dispatch(viewProducts(id));
    }
  }, [dispatch, id]);

  // 2. Initialize local state ONLY when product data first arrives AND matches the current ID
  useEffect(() => {
    // Ensure product exists, matches current ID, and hasn't been loaded into local state yet
    if (product && product.id && product.id.toString() === id.toString() && !isProductLoaded.current) {
      setState({
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        image: product.image || "",
      });
      isProductLoaded.current = true; // Mark as loaded
    }
    // If id changes or product becomes null/different, reset the loaded flag
    if (!product || product.id?.toString() !== id?.toString()) {
        isProductLoaded.current = false;
    }
  }, [product, id]); // Depend on product and id

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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
      const updatedProduct = {
        id: id,
        title: state.title,
        price: Number(state.price),
        category: state.category,
        description: state.description,
        image: state.image,
      };

      await dispatch(editProducts(updatedProduct)).unwrap();
      showSuccessToast(TEXT.PRODUCT_UPDATED);

      // Using navigate directly without timeout is generally safer and non-blocking
      navigate("/");
    } catch (error) {
      console.error("Update error:", error);
      showErrorToast(TEXT.ERROR_OCCURRED);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If the product is loading OR if the product data hasn't arrived yet for the current ID
  if (loading || (!product || product.id?.toString() !== id?.toString())) {
      return <Loader fullScreen text={TEXT.LOADING} />;
  }

  // If there's an error after loading attempt
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-red-500 text-xl">{error}</h2>
      </div>
    );
  }

  // Ensure state is properly initialized before rendering the form
  // This check is important to prevent rendering with empty fields while data is awaited
  // We can use a combination of `isProductLoaded.current` and checking if state fields are populated
  // If `isProductLoaded.current` is true, it means `state` has been populated from `product`.
  if (!isProductLoaded.current || !state.title) { // Add a check for a key field
      return <Loader fullScreen text={TEXT.LOADING} />;
  }


  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
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
          value={state.title}
          onChange={handleChange}
          error={errors.title}
          required
        />

        <Input
          type="number"
          name="price"
          label={TEXT.FORM_PRICE_LABEL}
          placeholder={TEXT.FORM_PRICE_PLACEHOLDER}
          value={state.price}
          onChange={handleChange}
          error={errors.price}
          required
        />

        <Input
          type="text"
          name="category"
          label={TEXT.FORM_CATEGORY_LABEL}
          placeholder={TEXT.FORM_CATEGORY_PLACEHOLDER}
          value={state.category}
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
            value={state.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white ${
              errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
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
          value={state.image}
          onChange={handleChange}
          error={errors.image}
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Updating..." : TEXT.BTN_UPDATE}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
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