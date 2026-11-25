import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers3,
  ArrowUpRight,
  Plus,
  Search,
  RefreshCw,
} from 'lucide-react';
import { adminRequest } from '../../services/admin.js';
import { useCatalogue } from '../../context/CatalogueContext.jsx';
import AdminForm from './AdminForm.jsx';
import './admin.css';

function Photo({ src, title }) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? (
    <img src={src} alt={title} onError={() => setFailed(true)} />
  ) : (
    <span className="admin-photo-placeholder">
      <Package size={20} />
    </span>
  );
}
export default function AdminPortal() {
  const [data, setData] = useState({ products: [], categories: [] });
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const [notice, setNotice] = useState('');
  const location = useLocation();
  const { retry } = useCatalogue();
  const reload = () => setRevision((value) => value + 1);
  useEffect(() => {
    document.title = 'Admin — Ladakh Heritage';
    const controller = new AbortController();
    setStatus('loading');
    adminRequest('catalogue', undefined, controller.signal)
      .then((body) => {
        setData(body);
        setStatus('ready');
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
          setStatus('error');
        }
      });
    return () => controller.abort();
  }, [revision]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const saved = (message) => {
    setNotice(message);
    reload();
    retry();
  };
  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-brand">
          <span>LH</span>
          <div>
            LADAKH HERITAGE<small>COLLECTION STUDIO</small>
          </div>
        </Link>
        <p className="admin-nav-label">WORKSPACE</p>
        <nav aria-label="Admin navigation">
          <NavLink end to="/admin">
            <LayoutDashboard size={18} /> Overview
          </NavLink>
          <NavLink to="/admin/products">
            <Package size={18} /> Products <small>{data.products.length}</small>
          </NavLink>
          <NavLink to="/admin/categories">
            <Layers3 size={18} /> Categories <small>{data.categories.length}</small>
          </NavLink>
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-status-dot" /> Local workspace<p>Catalogue management</p>
          <Link to="/">
            Visit storefront <ArrowUpRight size={16} />
          </Link>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <span>YOUR COLLECTION, THOUGHTFULLY CURATED</span>
          <Link to="/products?category=All%20Treasures">
            View store <ArrowUpRight size={15} />
          </Link>
        </header>
        <main className="admin-main">
          {notice && (
            <div role="status" className="admin-success">
              {notice}
              <button onClick={() => setNotice('')} aria-label="Dismiss notification">
                ×
              </button>
            </div>
          )}
          {status === 'loading' ? (
            <div className="admin-state" role="status">
              Loading your workspace…
            </div>
          ) : status === 'error' ? (
            <div className="admin-state" role="alert">
              <h2>Unable to load the workspace</h2>
              <p>{error}</p>
              <button className="admin-button" onClick={reload}>
                Try again
              </button>
            </div>
          ) : (
            <Routes>
              <Route path="/admin" element={<Overview data={data} />} />
              <Route
                path="/admin/products"
                element={<Listing key="products" type="products" data={data} reload={reload} />}
              />
              <Route
                path="/admin/categories"
                element={<Listing key="categories" type="categories" data={data} reload={reload} />}
              />
              <Route
                path="/admin/products/new"
                element={
                  <AdminForm
                    key="products"
                    type="products"
                    categories={data.categories}
                    onSaved={saved}
                  />
                }
              />
              <Route
                path="/admin/categories/new"
                element={
                  <AdminForm
                    key="categories"
                    type="categories"
                    categories={data.categories}
                    onSaved={saved}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <div className="admin-state">
                    <h1>Page not found</h1>
                    <Link to="/admin">Back to overview</Link>
                  </div>
                }
              />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
}
function Overview({ data }) {
  const published = data.products.filter((item) => item.isActive).length;
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">THE BIG PICTURE</p>
          <h1>A home for your treasures.</h1>
          <p>Keep every piece and collection beautifully organised.</p>
        </div>
        <Link className="admin-button" to="/admin/products/new">
          <Plus size={17} /> Add product
        </Link>
      </div>
      <div className="admin-stats">
        {[
          ['Total products', data.products.length, Package],
          ['Active products', published, ArrowUpRight],
          ['Collections', data.categories.length, Layers3],
        ].map(([label, count, Icon]) => (
          <div key={label}>
            <span>
              {label}
              <Icon size={19} />
            </span>
            <strong>{count.toString().padStart(2, '0')}</strong>
            <small>
              {label === 'Active products'
                ? 'Visibility also follows the parent category'
                : 'In your catalogue'}
            </small>
          </div>
        ))}
      </div>
      <section className="admin-welcome">
        <div>
          <p className="admin-eyebrow">A COLLECTION WITH CHARACTER</p>
          <h2>
            Make room for
            <br />
            <em>the next discovery.</em>
          </h2>
          <p>Add a new piece, give it a story, and find its place in your collections.</p>
          <Link to="/admin/categories/new">
            Create a collection <ArrowUpRight size={18} />
          </Link>
        </div>
        <span className="admin-ornament" aria-hidden="true">
          ✳
        </span>
      </section>
      <div className="admin-section-heading">
        <h2>Recently added</h2>
        <Link to="/admin/products">
          All products <ArrowUpRight size={15} />
        </Link>
      </div>
      <ProductTable products={data.products.slice(0, 5)} categories={data.categories} />
    </>
  );
}
function ProductTable({ products, categories }) {
  if (!products.length)
    return (
      <div className="admin-state">
        <Package size={30} />
        <h2>No products yet</h2>
        <p>Add your first product to begin your collection.</p>
        <Link className="admin-button" to="/admin/products/new">
          Add product
        </Link>
      </div>
    );
  return (
    <div className="admin-table-wrap" role="region" aria-label="Products list" tabIndex={0}>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Collection</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="admin-product-cell">
                  <Photo src={item.image} title={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.materials || 'Details not added'}</small>
                  </div>
                </div>
              </td>
              <td>
                {categories.find((cat) => cat.slug === item.category)?.title || item.category}
              </td>
              <td>
                {item.priceINR == null ? 'On request' : `₹${item.priceINR.toLocaleString('en-IN')}`}
              </td>
              <td>
                <span className={`admin-badge ${item.isActive ? 'is-active' : ''}`}>
                  {item.isActive ? 'Active' : 'Draft'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Listing({ type, data, reload }) {
  const [search, setSearch] = useState('');
  const categories = type === 'categories';
  const items = data[type].filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CATALOGUE</p>
          <h1>{categories ? 'Your collections.' : 'Your products.'}</h1>
          <p>
            {categories
              ? 'Give every treasure a place to belong.'
              : 'All the pieces that make your store unique.'}
          </p>
        </div>
        <Link className="admin-button" to={`/admin/${type}/new`}>
          <Plus size={17} /> Add {categories ? 'category' : 'product'}
        </Link>
      </div>
      <div className="admin-list-toolbar">
        <label>
          <Search size={18} />
          <input
            aria-label={`Search ${type}`}
            placeholder={`Search ${type}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <span>
          {items.length} {type}
        </span>
        <button className="admin-icon-button" aria-label="Refresh catalogue" onClick={reload}>
          <RefreshCw size={17} />
        </button>
      </div>
      {!items.length && search ? (
        <div className="admin-state">No matches. Try a different search.</div>
      ) : categories ? (
        <div className="admin-category-grid">
          {items.map((item) => (
            <article key={item.id}>
              <div className="admin-category-photo">
                <Photo src={item.image} title={item.title} />
                <span className={`admin-badge ${item.isActive ? 'is-active' : ''}`}>
                  {item.isActive ? 'Active' : 'Draft'}
                </span>
              </div>
              <div className="admin-category-body">
                <small>
                  {data.categories.find((cat) => cat.slug === item.parent)?.title ||
                    'TOP-LEVEL COLLECTION'}
                </small>
                <h2>{item.title}</h2>
                <p>{item.text || 'No description yet.'}</p>
                <footer>
                  {data.products.filter((product) => product.category === item.slug).length} direct
                  products<span>{item.slug}</span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <ProductTable products={items} categories={data.categories} />
      )}
      {categories && !data.categories.length && (
        <div className="admin-state">No categories yet. Create your first collection above.</div>
      )}
    </>
  );
}
