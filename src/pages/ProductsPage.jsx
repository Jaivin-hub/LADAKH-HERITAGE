import useProductCatalogue from '../hooks/useProductCatalogue.js';

import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

import { categoryFromSearch } from '../data/collections.js';
import { useCatalogue } from '../context/CatalogueContext.jsx';
import CatalogueStatus from '../components/products/CatalogueStatus.jsx';
import CategoryCards from '../components/collections/CategoryCards.jsx';
import Eyebrow from '../components/ui/Eyebrow.jsx';
import ProductFilters from '../components/products/ProductFilters.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import ProductPagination from '../components/products/ProductPagination.jsx';
import ProductModal from '../components/products/ProductModal.jsx';

export default function ProductsPage() {
  const location = useLocation();
  const { categories, status, retry } = useCatalogue();
  const catalogueRequested = Boolean(categoryFromSearch(location.search));
  const {
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
    productCount,
    productsStatus,
    retryProducts,
    visibleProducts,
    productsPerPage,
    totalPages,
    safePage,
    goToProductPage,
  } = useProductCatalogue(location);
  const parentCategory = categories.find((item) => item.title === selectedCategory)?.parentCategory;
  const childCategories = categories.filter((item) => item.parentCategory === selectedCategory);
  if (status !== 'ready')
    return (
      <section id="products" className="bg-paper px-[7%] py-16">
        <CatalogueStatus status={status} retry={retry} />
      </section>
    );
  if (!catalogueRequested)
    return (
      <section id="products" className="bg-paper px-[7%] py-10 sm:py-16 lg:px-[10.5%]">
        <h1 className="sr-only">Product collections</h1>
        <CategoryCards />
      </section>
    );
  return (
    <>
      <section
        id="products"
        className="scroll-mt-[118px] bg-[#f2ebdf] border-t border-[#c9bda6] px-[5%] pt-5 pb-[70px] sm:px-[7%] sm:pt-6 sm:pb-20 lg:px-[9%] lg:pb-[100px]"
      >
        <div className="max-w-7xl mx-auto">
          <Link
            to={
              parentCategory
                ? `/products?category=${encodeURIComponent(parentCategory)}`
                : '/products'
            }
            className="mb-6 inline-flex items-center gap-2 text-xs text-rust hover:underline"
          >
            {parentCategory ? `← ${parentCategory}` : '← All categories'}
          </Link>
          <ProductFilters
            categoryTabs={categoryTabs}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            productCount={productCount}
          />

          {/* Showcase Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <Eyebrow>BOUTIQUE SHOWCASE</Eyebrow>
              <h1 className="mt-4 font-serif text-[42px] leading-[1.05] tracking-[-.04em] sm:text-[54px]">
                {selectedCategory === 'All Treasures' ? (
                  <>
                    Curated <em className="font-normal text-rust">Treasures</em>
                  </>
                ) : (
                  selectedCategory
                )}
              </h1>
            </div>
            <p className="max-w-md text-xs leading-[1.85] text-[#77715f]">
              Browse our current selection available at our Varkala store. Filter by category,
              search specific materials or reserve an object prior to your visit.
            </p>
          </div>

          {childCategories.length > 0 && (
            <div className="mb-10">
              <p className="mb-4 text-xs uppercase tracking-widest text-rust">
                Explore {selectedCategory}
              </p>
              <CategoryCards items={childCategories} />
            </div>
          )}

          {/* Products Grid */}
          {productsStatus !== 'ready' ? (
            <CatalogueStatus status={productsStatus} retry={retryProducts} />
          ) : productCount > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpen={handleOpenProductModal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-paper border border-dashed border-[#cbb99a] p-8">
              <Sparkles size={32} className="mx-auto text-rust mb-3 opacity-80" />
              <h3 className="font-serif text-xl text-ink mb-1">
                {selectedCategory === 'Custom Jewellery' ||
                selectedCategory === 'Jewellery Repairing'
                  ? 'Let’s talk about your jewellery'
                  : 'No products listed yet'}
              </h3>
              <p className="text-xs text-[#77715f] max-w-md mx-auto mb-5">
                {selectedCategory === 'All Treasures'
                  ? 'Try another search or clear the filters to browse our collection.'
                  : 'Visit our Varkala store to explore this category and discuss availability or your requirements.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Treasures');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 bg-ink text-paper text-xs px-4 py-2.5 uppercase tracking-wider hover:bg-rust transition"
              >
                View All Products
              </button>
            </div>
          )}

          {productCount > 0 && (
            <ProductPagination
              safePage={safePage}
              productsPerPage={productsPerPage}
              productCount={productCount}
              totalPages={totalPages}
              goToProductPage={goToProductPage}
            />
          )}
        </div>
      </section>

      {activeModalProduct && (
        <ProductModal
          key={activeModalProduct.id}
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </>
  );
}
