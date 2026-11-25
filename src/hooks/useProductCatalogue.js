import { useEffect, useState } from 'react';
import { useCatalogue } from '../context/CatalogueContext.jsx';
import { categoryFromSearch } from '../data/collections.js';
import { fetchProducts } from '../services/catalogue.js';
import { API_BASE_URL } from '../config/api.js';
const initialFilters = (search) => ({
  category: categoryFromSearch(search) || 'All Treasures',
  search: '',
  sort: 'featured',
  page: 1,
  limit: 8,
});
export default function useProductCatalogue(location) {
  const { categories, status: categoriesStatus } = useCatalogue();
  const [filters, setFilters] = useState(() => initialFilters(location.search));
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({
    key: '',
    products: [],
    pagination: { page: 1, limit: 8, total: 0, totalPages: 1 },
    status: 'loading',
  });
  useEffect(() => {
    setFilters(initialFilters(location.search));
    setActiveModalProduct(null);
  }, [location.pathname, location.search]);
  const requested = Boolean(categoryFromSearch(location.search));
  const category = categories.find(
    (item) => item.title === filters.category || item.slug === filters.category,
  );
  const request = { ...filters, category: category?.slug || filters.category };
  const key = JSON.stringify(request);
  useEffect(() => {
    if (!requested || categoriesStatus !== 'ready') return;
    let active = true;
    const controller = new AbortController();
    let timeout;
    // Debounce rapid search edits; abort old requests and ignore stale responses.
    const debounce = setTimeout(() => {
      timeout = setTimeout(() => controller.abort(), 15000);
      fetchProducts(API_BASE_URL, JSON.parse(key), controller.signal)
        .then((data) => {
          if (active) setResult({ ...data, key, status: 'ready' });
        })
        .catch(() => {
          if (active)
            setResult({
              key,
              products: [],
              pagination: { page: 1, limit: 8, total: 0, totalPages: 1 },
              status: 'error',
            });
        })
        .finally(() => clearTimeout(timeout));
    }, 200);
    return () => {
      active = false;
      clearTimeout(debounce);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [key, requested, categoriesStatus, attempt]);
  const update = (field, value) =>
    setFilters((previous) => ({ ...previous, [field]: value, page: 1 }));
  const productsStatus = result.key === key ? result.status : 'loading';
  const ready = productsStatus === 'ready';
  return {
    categoryTabs: ['All Treasures', ...categories.map((item) => item.title)],
    selectedCategory: category?.title || filters.category,
    setSelectedCategory: (value) => update('category', value),
    searchQuery: filters.search,
    setSearchQuery: (value) => update('search', value),
    sortBy: filters.sort,
    setSortBy: (value) => update('sort', value),
    activeModalProduct,
    setActiveModalProduct,
    handleOpenProductModal: setActiveModalProduct,
    visibleProducts: ready ? result.products : [],
    productCount: ready ? result.pagination.total : 0,
    productsStatus,
    retryProducts: () => {
      setResult((previous) => ({ ...previous, status: 'loading' }));
      setAttempt((value) => value + 1);
    },
    productsPerPage: filters.limit,
    totalPages: ready ? result.pagination.totalPages : 1,
    safePage: ready ? result.pagination.page : filters.page,
    goToProductPage: (page) => {
      setFilters((previous) => ({ ...previous, page }));
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  };
}
