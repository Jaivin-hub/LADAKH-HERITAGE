# Ladakh Heritage Website

A responsive boutique showcase built with React 18, Vite 6, React Router 6, and Tailwind CSS 4.

The site includes a home page, category collections, a searchable product catalogue with sorting and pagination, product galleries with zoom, and store contact links. The product catalogue and category cards now load from a configurable server API. Until that server is connected, they display a preparation message. Main-page imagery remains local; previous product assets are preserved. See [the API integration contract](docs/CATALOGUE-API.md).

## Getting started

Use Node.js 22 LTS and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. To use the original preview port, run `npm run dev -- --port 5174`.

## Commands

| Command                      | Purpose                                              |
| ---------------------------- | ---------------------------------------------------- |
| `npm run dev`                | Start local development with live reload             |
| `npm run build`              | Generate the static website in `dist/`               |
| `npm run preview`            | Preview the production build locally                 |
| `npm test`                   | Check category resolution, search and sorting        |
| `npm run validate:catalogue` | Check product IDs, categories and image files        |
| `npm run check`              | Run tests, catalogue validation and production build |
| `npm run format`             | Format source, scripts, tests and documentation      |
| `npm run format:check`       | Check formatting without changing files              |

## Project structure

```text
src/
  App.jsx                 Application shell and page selection
  main.jsx                React entry point and BrowserRouter
  pages/                  HomePage and ProductsPage
  components/
    layout/               Shared header and footer
    home/                 Hero, marquee, collections, story and visit sections
    collections/          Reusable category cards
    products/             Filters, cards, pagination and product modal
    icons/                Custom WhatsApp icon
    ui/                   Shared small UI components
  hooks/                  Catalogue state and page navigation effects
  data/
    collections.js        Category labels, links and category images
    products/             Product records by collection; index.js combines them
  config/                 Contact links, hero images and indicative currency rate
  utils/                  Pure catalogue filtering and sorting
  styles/                 Tailwind theme, global styles and animations
public/
  products/               Product images, extra views and original shop photos
  categories/             Category wallpaper images
  hero/                   Home slideshow images
scripts/                  Asset validation and optional catalogue maintenance
tests/                    Catalogue regression tests
docs/                     Client handoff guide and retained asset production records
```

See [the handoff guide](docs/HANDOFF.md) for editing content, deployment and milestone scope. The image-generation prompts and manifests are preserved in `docs/assets/`; they are not needed to run or deploy the website.

## Sharing with the client

Share the source repository including `public/`, `src/`, `package.json`, `package-lock.json`, `index.html`, `vite.config.js`, scripts, tests and documentation. Product images must be included; their folder is deliberately **not** ignored by Git.

Do not include `node_modules/`, local environment files or generated `dist/` in a source handoff. The client recreates dependencies with `npm ci` and builds with `npm run build`. For a deployment-only handoff, share the generated `dist/` folder instead. If the Git host limits repository size, transfer the complete source folder as an archive, with the same exclusions.
