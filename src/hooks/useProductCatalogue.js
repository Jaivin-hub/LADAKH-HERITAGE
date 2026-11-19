import { useEffect, useMemo, useState } from 'react';
import { useCatalogue } from '../context/CatalogueContext.jsx';
import { categoryFromSearch } from '../data/collections.js';
import { filterProducts } from '../utils/catalogue.js';

export default function useProductCatalogue(location) {
  const { products: productsData, categories } = useCatalogue();
  const categoryTabs = ['All Treasures', ...categories.map((item) => item.title)];
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = categoryFromSearch(location.search);
    return category || 'All Treasures';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const category = categoryFromSearch(location.search);
    setSelectedCategory(category || 'All Treasures');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    setActiveModalProduct(null);
  }, [location.pathname, location.search]);
  const productsPerPage = 8;
  const handleOpenProductModal = (product) => setActiveModalProduct(product);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const filteredProducts = useMemo(
    () => filterProducts(productsData, selectedCategory, searchQuery, sortBy),
    [productsData, selectedCategory, searchQuery, sortBy],
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const visibleProducts = filteredProducts.slice(
    (safePage - 1) * productsPerPage,
    safePage * productsPerPage,
  );
  const goToProductPage = (page) => {
    setCurrentPage(page);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return {
    categoryTabs,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    activeModalProduct,
    setActiveModalProduct,
    handleOpenProductModal,
    filteredProducts,
    visibleProducts,
    productsPerPage,
    totalPages,
    safePage,
    goToProductPage,
  };
}
