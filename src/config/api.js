// Use the hosted API in local development and production.
// VITE_CATALOGUE_API_URL can override this for an isolated backend.
export const API_BASE_URL =
  import.meta.env.VITE_CATALOGUE_API_URL?.trim().replace(/\/+$/, '') ||
  'https://api.ladakhheritage.com/api';
