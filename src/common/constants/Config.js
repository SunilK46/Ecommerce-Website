export const CONFIG = {
  API_BASE_URL: "http://localhost:7000",
  API_ENDPOINTS: {
    PRODUCTS: "/products",
    CART: "/cart"
  },

  STORAGE_KEYS: {
    CART: "flybuy_cart_v1",
    THEME: "flybuy_theme",
    USER_PREFERENCES: "flybuy_user_prefs"
  },

  PAGINATION: {
    DEFAULT_PAGE_SIZE: 8,
    PAGE_SIZE_OPTIONS: [4, 8, 12, 16],
    MAX_PAGE_BUTTONS: 5
  },

  DEBOUNCE_DELAY: 500, 

  CATEGORIES: [
    "All Categories",
    "Headphones",
    "Laptop",
    "Smartwatch",
    "Camera",
    "Electronics",
    "Fashion",
    "Books",
    "Home & Kitchen",
    "Sports"
  ],

  SORT_OPTIONS: [
    { value: "default", label: "Default" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" }
  ],

  TOAST: {
    POSITION: "top-right",
    AUTO_CLOSE: 3000,
    HIDE_PROGRESS_BAR: false,
    CLOSE_ON_CLICK: true,
    PAUSEON_HOVER: true,
    DRAGGABLE: true
  },

  DEFAULT_PRODUCT_IMAGE: "https://via.placeholder.com/300x300?text=No+Image",

  VALIDATION: {
    MIN_PRICE: 1,
    MAX_PRICE: 1000000,
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 100,
    MIN_DESCRIPTION_LENGTH: 10,
    MAX_DESCRIPTION_LENGTH: 500
  }
};

export default CONFIG;