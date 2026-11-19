# Milestone 1 handoff (historical)

**Current status:** The frontend has since moved to an API-backed catalogue. Products and categories no longer use the local data described below. See [CATALOGUE-API.md](CATALOGUE-API.md) for current integration instructions. The notes below document the previous static milestone.

## Delivered scope

This is a static storefront showcase. The catalogue is bundled from local JavaScript data and the browser handles filtering, search, sorting, pagination and image viewing. The shop's WhatsApp, telephone, Telegram, Instagram and map links open the relevant external services.

There is no checkout, payment processing, stock synchronization, customer account, admin panel, reservation submission or database in this milestone. “Inquire about object” opens product information and directs visitors to the physical store.

## Editing content

- **Products:** edit the appropriate file in `src/data/products/`. `index.js` sets collection ordering. Keep each product ID unique. Required text fields are `title`, `category`, `materials`, `description` and `origin`. `image` is a `/products/...` URL. `images` optionally adds gallery views; `originalImage` links to the source photo. `priceINR: null` displays “Price on request.”
- **Categories:** edit `src/data/collections.js`. Match product category strings exactly. Silver subcategories use `parentCategory: 'Silver Jewellery'` and the existing URL resolver. Add a collection card and tab when introducing a new category.
- **Images:** place product images in `public/products/`, category images in `public/categories/`, and slideshow backgrounds in `public/hero/`. Reference them without the `public` prefix. Preserve existing filenames when replacing an image. Do not remove original photos still linked from product details.
- **Home content:** edit the relevant section in `src/components/home/`.
- **Contact links:** edit `src/config/contact.js`.
- **Slideshow images:** edit `src/config/media.js`.
- **EUR conversion:** `src/config/currency.js` holds the existing fixed indicative INR/EUR rate and its reference date. It is not a live rate service. Review the rate before publication as needed.
- **Styling:** Tailwind utility classes live alongside components. Theme colours, fonts, marquee animation and shared grid rules are in `src/styles/index.css`.
- **Page title and anchor scrolling:** `src/hooks/usePageNavigation.js`.

The AI-styled product images retain the original-photo links and disclosure in the product modal. Store approval of names, materials, prices and image accuracy remains part of content sign-off.

## Production deployment

1. Run `npm ci` and `npm run check`.
2. Upload the **contents** of `dist/` to the static host, or configure its build command as `npm run build` and publish directory as `dist`.
3. Configure a single-page-app fallback: requests for `/products` (and other application paths) must serve `/index.html` when no real file exists. Keep real asset paths intact. On Netlify-style hosts the rewrite is `/* /index.html 200`; for Nginx use `try_files $uri $uri/ /index.html;` in the site location block. Apply the equivalent rule on the chosen host.
4. The current configuration assumes deployment at the domain root. A subdirectory deployment requires adjusting Vite's base, router basename, and root-relative asset URLs together.
5. Verify a direct load and refresh of `/products?category=Silver%20Jewellery&subcategory=vintage-pendants`, plus mobile navigation, product modal, search, pagination, contact links and home anchor links.

Google Fonts load from Google's font service; local fallback fonts are used if it is unavailable. All product and category images are local static files. `npm run preview` is a local verification server, not a production hosting service.

## Optional maintenance records

`docs/assets/prompts/` holds generation prompts. `docs/assets/manifests/` holds generation inventories and the Drive upload record. These files are preserved for traceability and are not imported by the website.

The `scripts/sync-*.mjs` utilities regenerate selected product data files from those manifests. They are optional maintainer tools, **not** build steps. Review changes before using them: the silver-pendant and Victory utilities can overwrite manually edited descriptions and prices. Ordinary client updates should be made directly in `src/data/products/`.

## Verification

`npm run check` verifies filtering behaviour, category URLs, unique product IDs, referenced image files and a production build. `npm run format:check` checks formatting. After visual changes, also review the site in desktop and mobile browsers.
