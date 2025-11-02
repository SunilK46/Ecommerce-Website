import { toast } from 'react-toastify';
import { CONFIG } from '../constants/Config';

/**
 * Toast notification utility functions
 */

// Success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: CONFIG.TOAST.POSITION,
    autoClose: CONFIG.TOAST.AUTO_CLOSE,
    hideProgressBar: CONFIG.TOAST.HIDE_PROGRESS_BAR,
    closeOnClick: CONFIG.TOAST.CLOSE_ON_CLICK,
    pauseOnHover: CONFIG.TOAST.PAUSEON_HOVER,
    draggable: CONFIG.TOAST.DRAGGABLE,
  });
};

// Error toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: CONFIG.TOAST.POSITION,
    autoClose: CONFIG.TOAST.AUTO_CLOSE,
    hideProgressBar: CONFIG.TOAST.HIDE_PROGRESS_BAR,
    closeOnClick: CONFIG.TOAST.CLOSE_ON_CLICK,
    pauseOnHover: CONFIG.TOAST.PAUSEON_HOVER,
    draggable: CONFIG.TOAST.DRAGGABLE,
  });
};

// Info toast
export const showInfoToast = (message) => {
  toast.info(message, {
    position: CONFIG.TOAST.POSITION,
    autoClose: CONFIG.TOAST.AUTO_CLOSE,
    hideProgressBar: CONFIG.TOAST.HIDE_PROGRESS_BAR,
    closeOnClick: CONFIG.TOAST.CLOSE_ON_CLICK,
    pauseOnHover: CONFIG.TOAST.PAUSEON_HOVER,
    draggable: CONFIG.TOAST.DRAGGABLE,
  });
};

// Warning toast
export const showWarningToast = (message) => {
  toast.warning(message, {
    position: CONFIG.TOAST.POSITION,
    autoClose: CONFIG.TOAST.AUTO_CLOSE,
    hideProgressBar: CONFIG.TOAST.HIDE_PROGRESS_BAR,
    closeOnClick: CONFIG.TOAST.CLOSE_ON_CLICK,
    pauseOnHover: CONFIG.TOAST.PAUSEON_HOVER,
    draggable: CONFIG.TOAST.DRAGGABLE,
  });
};

export default {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast
};