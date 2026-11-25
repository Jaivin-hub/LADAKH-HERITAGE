# Dynamic catalogue integration

The sibling `../server` project implements MongoDB-backed read-only APIs. See its README and `examples/` for manual category/product entry and images.

## Development

Run the server on port 4000 with `MONGODB_URI` in its `.env`. Run this frontend with `npm run dev` on port 5174. Vite proxies `/api` to `http://127.0.0.1:4000`. `VITE_CATALOGUE_API_URL` defaults to `/api`; it can be overridden with a full server API URL. Restart Vite after changing environment variables.

## Data flow

- `CatalogueProvider` fetches `GET /api/categories` for collection cards, navigation and subcategories.
- `useProductCatalogue` fetches `GET /api/products?category=SLUG&search=TEXT&sort=featured&page=1&limit=8`. Search is debounced, old requests are cancelled, and stale responses cannot replace newer results.
- Category, sorting and search changes reset pagination. Product counts and pages come from the API, not local filtering.
- Category cards display server-provided image URLs. Product cards and modal galleries use the API's product image URLs.
- The home hero/story images remain local. Old catalogue data stays archived and is never a fallback.

The server returns display category titles plus stable category slugs. Existing title-based URLs and legacy silver subcategory links still work. Parent categories include their descendants. Loading, empty, retry and error states remain supported.

## Deployment

Set `VITE_CATALOGUE_API_URL` to the deployed HTTPS API base (ending in `/api`) before building, or configure the website host to proxy `/api`. Configure the website origin in the server's `CORS_ORIGINS`. Set server `PUBLIC_BASE_URL` for uploaded image URLs. MongoDB credentials belong only in server environment variables.

`npm run check` runs frontend tests and a production build. `npm run validate:catalogue` is an optional historical asset audit and requires the deliberately removed old product images; it is not part of the dynamic frontend build.
