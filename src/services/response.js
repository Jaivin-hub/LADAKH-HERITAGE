/** Parse API responses without displaying HTML hosting errors as JSON exceptions. */
export async function readApiResponse(response) {
  const contentType = response.headers?.get('content-type');
  if (contentType && !contentType.toLowerCase().includes('application/json')) {
    throw new Error(
      `The API returned a non-JSON response (${response.status}). Check VITE_CATALOGUE_API_URL and your hosting /api proxy, then rebuild the frontend.`,
    );
  }
  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error(`The API returned an invalid JSON response (${response.status}).`);
  }
  if (!response.ok) {
    throw new Error(body?.error || `API request failed (${response.status}).`);
  }
  return body;
}
