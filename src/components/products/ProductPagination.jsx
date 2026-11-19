export default function ProductPagination({
  safePage,
  productsPerPage,
  productCount,
  totalPages,
  goToProductPage,
}) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <p aria-live="polite" className="text-[11px] text-[#77715f]">
        Showing {(safePage - 1) * productsPerPage + 1}–
        {Math.min(safePage * productsPerPage, productCount)} of {productCount} products
      </p>
      {totalPages > 1 && (
        <nav
          aria-label="Product pages"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <button
            disabled={safePage === 1}
            onClick={() => goToProductPage(safePage - 1)}
            className="border border-[#cbb99a] px-3 py-2 text-xs transition hover:border-rust disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              aria-label={`Page ${page}`}
              aria-current={safePage === page ? 'page' : undefined}
              onClick={() => goToProductPage(page)}
              className={`h-9 min-w-9 border px-2 text-xs transition ${safePage === page ? 'border-ink bg-ink text-paper' : 'border-[#cbb99a] bg-paper hover:border-rust'}`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={safePage === totalPages}
            onClick={() => goToProductPage(safePage + 1)}
            className="border border-[#cbb99a] px-3 py-2 text-xs transition hover:border-rust disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
