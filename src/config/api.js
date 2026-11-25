// /api is proxied to the local server by Vite. Production can use an HTTPS API URL.
export const API_BASE_URL = import.meta.env.VITE_CATALOGUE_API_URL?.trim() || '/api';
