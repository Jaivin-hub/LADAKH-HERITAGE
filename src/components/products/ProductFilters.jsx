import { useEffect, useRef } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ProductFilters({
  categoryTabs,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  productCount,
}) {
  const categoryRailRef = useRef(null);
  useEffect(() => {
    const rail = categoryRailRef.current;
    const active = rail?.querySelector('[aria-pressed="true"]');
    if (active)
      rail.scrollTo({
        left: active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2,
        behavior: 'smooth',
      });
  }, [selectedCategory]);
  return (
    <div
      role="search"
      aria-label="Filter products"
      className="catalogue-filter sticky top-[110px] z-30 mb-7 rounded-[3px] border border-[#d4c5ad] bg-paper/95 shadow-[0_5px_18px_-10px_#45362266] backdrop-blur-md sm:top-[118px]"
    >
      <div className="flex items-center gap-2 border-b border-[#ddd2bf] px-3 sm:px-4">
        <button
          aria-label="Previous categories"
          onClick={() => categoryRailRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
          className="hidden h-8 w-8 shrink-0 cursor-pointer rounded-[3px] border border-[#d4c5ad] text-rust hover:bg-sand md:block"
        >
          ←
        </button>
        <div
          ref={categoryRailRef}
          role="group"
          aria-label="Product categories"
          className="category-rail relative flex min-w-0 flex-1 gap-2 overflow-x-auto py-3"
        >
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              aria-pressed={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 cursor-pointer whitespace-nowrap rounded-[3px] border px-4 py-2.5 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${selectedCategory === cat ? 'border-rust bg-rust text-white' : 'border-[#d4c5ad] bg-transparent text-ink hover:border-rust hover:bg-sand/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          aria-label="More categories"
          onClick={() => categoryRailRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
          className="hidden h-8 w-8 shrink-0 cursor-pointer rounded-[3px] border border-[#d4c5ad] text-rust hover:bg-sand md:block"
        >
          →
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4">
        <label className="relative min-w-[150px] flex-1 lg:max-w-sm">
          <span className="sr-only">Search products</span>
          <Search size={15} className="pointer-events-none absolute left-3 top-3 text-rust" />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-[3px] border border-[#d4c5ad] bg-white/60 pl-9 pr-3 text-xs outline-none focus:border-rust focus:ring-1 focus:ring-rust"
          />
        </label>
        <div className="relative shrink-0">
          <SlidersHorizontal
            size={14}
            className="pointer-events-none absolute left-3 top-3.5 text-rust"
          />
          <select
            aria-label="Sort products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 w-[130px] cursor-pointer rounded-[3px] border border-[#d4c5ad] bg-white/60 pl-9 pr-2 text-xs text-ink outline-none focus:border-rust sm:w-[190px]"
          >
            <option value="featured">Featured first</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name-az">Name: A–Z</option>
          </select>
        </div>
        <div className="flex w-full items-center justify-between gap-4 text-[11px] text-[#77715f] lg:ml-auto lg:w-auto lg:gap-6">
          <span aria-live="polite">
            <b className="text-ink">{productCount}</b> product{productCount === 1 ? '' : 's'}
          </span>
          {(searchQuery || selectedCategory !== 'All Treasures' || sortBy !== 'featured') && (
            <button
              onClick={() => {
                setSelectedCategory('All Treasures');
                setSearchQuery('');
                setSortBy('featured');
              }}
              className="cursor-pointer text-rust underline underline-offset-4 hover:text-ink"
            >
              Reset filters
            </button>
          )}
          <span className="text-[10px] md:hidden">Swipe categories ↔</span>
        </div>
      </div>
    </div>
  );
}
