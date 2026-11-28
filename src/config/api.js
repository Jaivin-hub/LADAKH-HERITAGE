// Use the hosted API in local development and production.
// VITE_CATALOGUE_API_URL can override this for an isolated backend.
export const API_BASE_URL =
  import.meta.env.VITE_CATALOGUE_API_URL?.trim().replace(/\/+$/, '') ||
  'https://api.ladakhheritage.com/api';

// Admin and storefront use the same hosted API in every environment.
export const ADMIN_API_BASE_URL =
  import.meta.env.VITE_ADMIN_API_URL?.trim().replace(/\/+$/, '') ||
  API_BASE_URL;
