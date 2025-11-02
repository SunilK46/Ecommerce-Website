// Validation utility functions
import { CONFIG } from '../constants/config';
import { TEXT } from '../constants/textConstants';

/**
 * Validate product title
 * @param {string} title - Product title
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateTitle = (title) => {
  if (!title || title.trim() === '') {
    return {
      isValid: false,
      error: TEXT.VALIDATION_TITLE_REQUIRED
    };
  }
  
  if (title.trim().length < CONFIG.VALIDATION.MIN_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `Title must be at least ${CONFIG.VALIDATION.MIN_TITLE_LENGTH} characters`
    };
  }
  
  if (title.length > CONFIG.VALIDATION.MAX_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `Title must not exceed ${CONFIG.VALIDATION.MAX_TITLE_LENGTH} characters`
    };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate product price
 * @param {number|string} price - Product price
 * @returns {object} { isValid: boolean, error: string }
 */
export const validatePrice = (price) => {
  if (!price || price === '' || price === null) {
    return {
      isValid: false,
      error: TEXT.VALIDATION_PRICE_REQUIRED
    };
  }
  
  const numPrice = Number(price);
  
  if (isNaN(numPrice) || numPrice <= 0) {
    return {
      isValid: false,
      error: TEXT.VALIDATION_PRICE_POSITIVE
    };
  }
  
  if (numPrice < CONFIG.VALIDATION.MIN_PRICE) {
    return {
      isValid: false,
      error: `Price must be at least ₹${CONFIG.VALIDATION.MIN_PRICE}`
    };
  }
  
  if (numPrice > CONFIG.VALIDATION.MAX_PRICE) {
    return {
      isValid: false,
      error: `Price must not exceed ₹${CONFIG.VALIDATION.MAX_PRICE}`
    };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate category
 * @param {string} category - Product category
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateCategory = (category) => {
  if (!category || category.trim() === '') {
    return {
      isValid: false,
      error: TEXT.VALIDATION_CATEGORY_REQUIRED
    };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate description
 * @param {string} description - Product description
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateDescription = (description) => {
  if (!description || description.trim() === '') {
    return {
      isValid: false,
      error: TEXT.VALIDATION_DESCRIPTION_REQUIRED
    };
  }
  
  if (description.trim().length < CONFIG.VALIDATION.MIN_DESCRIPTION_LENGTH) {
    return {
      isValid: false,
      error: `Description must be at least ${CONFIG.VALIDATION.MIN_DESCRIPTION_LENGTH} characters`
    };
  }
  
  if (description.length > CONFIG.VALIDATION.MAX_DESCRIPTION_LENGTH) {
    return {
      isValid: false,
      error: `Description must not exceed ${CONFIG.VALIDATION.MAX_DESCRIPTION_LENGTH} characters`
    };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate image URL
 * @param {string} url - Image URL
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateImageURL = (url) => {
  // Image is optional
  if (!url || url.trim() === '') {
    return { isValid: true, error: '' };
  }
  
  // Basic URL pattern check
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  
  if (!urlPattern.test(url)) {
    return {
      isValid: false,
      error: TEXT.VALIDATION_IMAGE_INVALID
    };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate entire product form
 * @param {object} product - Product object
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateProductForm = (product) => {
  const titleValidation = validateTitle(product.title);
  const priceValidation = validatePrice(product.price);
  const categoryValidation = validateCategory(product.category);
  const descriptionValidation = validateDescription(product.description);
  const imageValidation = validateImageURL(product.image);
  
  const errors = {};
  
  if (!titleValidation.isValid) {
    errors.title = titleValidation.error;
  }
  
  if (!priceValidation.isValid) {
    errors.price = priceValidation.error;
  }
  
  if (!categoryValidation.isValid) {
    errors.category = categoryValidation.error;
  }
  
  if (!descriptionValidation.isValid) {
    errors.description = descriptionValidation.error;
  }
  
  if (!imageValidation.isValid) {
    errors.image = imageValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate email
 * @param {string} email - Email address
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      error: 'Invalid email format'
    };
  }
  
  return { isValid: true, error: '' };
};

export default {
  validateTitle,
  validatePrice,
  validateCategory,
  validateDescription,
  validateImageURL,
  validateProductForm,
  validateEmail
};