import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Check } from 'lucide-react';
import ImageUploader from './ImageUploader.jsx';
import { adminRequest, adminImageUrl } from '../../services/admin.js';

export default function AdminForm({ type, categories, onSaved }) {
  const isCategory = type === 'categories';
  const label = isCategory ? 'category' : 'product';
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    slug: '',
    parent: '',
    category: '',
    image: '',
    images: '',
    text: '',
    description: '',
    materials: '',
    origin: 'Ladakh Heritage · Varkala',
    priceINR: '',
    badge: 'In the store',
    sortOrder: '0',
    isActive: true,
  });
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const update = (key, value) => {
    setForm((old) => ({ ...old, [key]: value }));
    if (key === 'image') setImageFailed(false);
  };
  const titleChange = (value) =>
    setForm((old) => ({
      ...old,
      title: value,
      ...(isCategory
        ? {
            slug: value
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, ''),
          }
        : {}),
    }));
  const save = async (event) => {
    event.preventDefault();
    if (saving || uploading) return;
    if (!isCategory && !photos.length) return setError('Add at least one product photo.');
    setSaving(true);
    setError('');
    const common = {
      title: form.title,
      image: photos[0] || '',
      sortOrder: Number(form.sortOrder),
      isActive: form.isActive,
    };
    const payload = isCategory
      ? { ...common, slug: form.slug, parent: form.parent, text: form.text }
      : {
          ...common,
          category: form.category,
          description: form.description,
          materials: form.materials,
          origin: form.origin,
          badge: form.badge,
          priceINR: form.priceINR === '' ? null : Number(form.priceINR),
          images: photos.slice(1),
        };
    try {
      await adminRequest(type, payload);
      onSaved(`${isCategory ? 'Category' : 'Product'} “${form.title}” added successfully.`);
      navigate(`/admin/${type}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };
  const field = (key, name, options = {}) => (
    <label className="admin-field">
      {name}
      <input value={form[key]} onChange={(e) => update(key, e.target.value)} {...options} />
    </label>
  );
  const preview = adminImageUrl(photos[0]);
  return (
    <>
      <Link className="admin-back" to={`/admin/${type}`}>
        <ArrowLeft size={16} /> Back to {type}
      </Link>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">GROW YOUR COLLECTION</p>
          <h1>Add a {label}.</h1>
          <p>
            {isCategory
              ? 'Create a collection that brings your pieces together.'
              : 'The details turn a beautiful object into a discovery.'}
          </p>
        </div>
      </div>
      <form onSubmit={save} className="admin-form-layout">
        <div className="admin-form-main">
          {error && (
            <div className="admin-error" role="alert">
              {error}
            </div>
          )}
          {!isCategory && !categories.length && (
            <div className="admin-error">
              Create a category before adding products.{' '}
              <Link to="/admin/categories/new">Add a category</Link>
            </div>
          )}
          <section className="admin-panel">
            <h2>
              01 <span>{isCategory ? 'Collection details' : 'Product details'}</span>
            </h2>
            <label className="admin-field">
              {isCategory ? 'Category name' : 'Product name'} *
              <input
                required
                maxLength={150}
                value={form.title}
                onChange={(e) => titleChange(e.target.value)}
                placeholder={
                  isCategory ? 'e.g. Vintage Silver Pendants' : 'e.g. Turquoise Silver Pendant'
                }
              />
            </label>
            {isCategory ? (
              <div className="admin-form-row">
                {field('slug', 'URL slug *', {
                  required: true,
                  pattern: '[a-z0-9]+(-[a-z0-9]+)*',
                  maxLength: 100,
                })}
                <label className="admin-field">
                  Parent collection
                  <select value={form.parent} onChange={(e) => update('parent', e.target.value)}>
                    <option value="">None — top-level category</option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.slug}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : (
              <label className="admin-field">
                Collection *
                <select
                  required
                  value={form.category}
                  onChange={(e) => update('category', e.target.value)}
                >
                  <option value="">Choose a category</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.slug}>
                      {item.title}
                      {item.isActive ? '' : ' (draft)'}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="admin-field">
              Description
              <textarea
                rows={4}
                maxLength={isCategory ? 1000 : 5000}
                value={isCategory ? form.text : form.description}
                onChange={(e) => update(isCategory ? 'text' : 'description', e.target.value)}
                placeholder="Tell the story behind this collection or piece…"
              />
            </label>
            {!isCategory && (
              <>
                <div className="admin-form-row">
                  {field('materials', 'Materials', {
                    maxLength: 500,
                    placeholder: 'Silver, turquoise…',
                  })}
                  {field('origin', 'Origin / collection label', { maxLength: 200 })}
                </div>
                <div className="admin-form-row">
                  {field('priceINR', 'Price in INR', {
                    type: 'number',
                    min: 0,
                    step: '.01',
                    placeholder: 'Leave blank for price on request',
                  })}
                  {field('badge', 'Product badge', { maxLength: 60 })}
                </div>
              </>
            )}
          </section>
          <section className="admin-panel">
            <h2>
              02 <span>Photography</span>
            </h2>
            <ImageUploader
              images={photos}
              maxImages={isCategory ? 1 : 12}
              disabled={saving}
              onBusyChange={setUploading}
              onChange={(images) => {
                setPhotos(images);
                setImageFailed(false);
              }}
            />
          </section>
        </div>
        <aside className="admin-form-aside">
          <section className="admin-panel">
            <h2>Preview</h2>
            <div className="admin-form-preview">
              {preview && !imageFailed ? (
                <img src={preview} alt="Image preview" onError={() => setImageFailed(true)} />
              ) : (
                <>
                  <ImagePlus size={32} />
                  <span>
                    {imageFailed
                      ? 'Image could not be loaded'
                      : form.image
                        ? 'Server image will appear after saving'
                        : 'Your image goes here'}
                  </span>
                </>
              )}
            </div>
            <h3>{form.title || `Your ${label} name`}</h3>
            <p>
              {isCategory
                ? 'A new corner of your collection.'
                : form.priceINR === ''
                  ? 'Price on request'
                  : `₹${Number(form.priceINR).toLocaleString('en-IN')}`}
            </p>
          </section>
          <section className="admin-panel">
            <h2>Visibility</h2>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => update('isActive', e.target.checked)}
              />{' '}
              Active in the storefront
            </label>
            <p className="admin-field-help">
              Drafts stay in the admin portal. An inactive parent category also hides its products.
            </p>
            {field('sortOrder', 'Display order', {
              type: 'number',
              min: 0,
              step: 1,
              required: true,
            })}
            <div className="admin-save-actions">
              <button
                className="admin-button"
                disabled={saving || uploading || (!isCategory && !categories.length)}
              >
                {saving ? (
                  'Saving…'
                ) : (
                  <>
                    <Check size={17} /> Save {label}
                  </>
                )}
              </button>
              <Link to={`/admin/${type}`}>Cancel</Link>
            </div>
          </section>
        </aside>
      </form>
    </>
  );
}
