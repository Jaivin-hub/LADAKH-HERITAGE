# Dynamic catalogue integration

The frontend is ready for a public read-only catalogue API. The server and its database are not implemented yet. No local products or category images are used as a fallback. The home hero, story and other main-page imagery remain local.

Copy `.env.example` to `.env.local`, set `VITE_CATALOGUE_API_URL` to the server's base URL (for example `https://api.example.com/api`), and restart Vite or rebuild for deployment. Leave it blank until the server is ready. Vite variables are public: never put credentials here. A separate-origin API must allow the website origin through CORS.

## Endpoints

`GET /products` returns `{ "products": [...] }`.

Each product uses the existing display fields:

```json
{
  "id": "pendant-1",
  "title": "Silver Pendant",
  "category": "Vintage Silver Pendants",
  "parentCategory": "Silver Jewellery",
  "image": "https://media.example.com/pendant-1.jpg",
  "images": ["https://media.example.com/pendant-1.jpg"],
  "description": "Product description",
  "materials": "Silver",
  "origin": "Ladakh Heritage · Varkala",
  "priceINR": null,
  "badge": "In the store"
}
```

IDs must be unique. Supply a product image URL and optional gallery URLs. `priceINR` is a number or null for price on request. Optional `originalImage` retains the original-photo link and existing AI-styling disclosure; omit it for ordinary photography.

`GET /categories` returns `{ "categories": [...] }`:

```json
{
  "title": "Vintage Silver Pendants",
  "parentCategory": "Silver Jewellery",
  "image": "https://media.example.com/pendants.jpg",
  "text": "Discover our vintage silver pendants."
}
```

Category titles must be unique and match product category values. Top-level categories omit `parentCategory`. Child categories appear under their parent. Image URLs should be absolute HTTPS URLs; root-relative URLs resolve against the website origin. The server controls ordering. Existing legacy silver subcategory URLs still resolve.

Both endpoints return complete arrays; search, sorting and pagination remain client-side for now. Server-side pagination will require a separate API/UI change. Requests have a 15-second timeout, cancellation on unmount, and a retry state. Errors never reveal old products. An empty or unconfigured catalogue shows an intentional preparation message.

## Preserved assets

`public/products/`, `public/categories/`, and the old `src/data/products/` records are preserved for migration. The archived catalogue validator continues checking these files; they are not the active catalogue. `src/data/collections.js` is retained for migration and legacy URL compatibility. Do not delete the old images during backend integration.
