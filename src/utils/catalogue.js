/** Filter without mutating the catalogue; unpriced items sort after priced items. */
export function filterProducts(products, selectedCategory, searchQuery, sortBy) {
  return products
    .filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Treasures' ||
        item.category === selectedCategory ||
        item.parentCategory === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low' || sortBy === 'price-high') {
        if (a.priceINR == null) return b.priceINR == null ? 0 : 1;
        if (b.priceINR == null) return -1;
      }
      if (sortBy === 'price-low') return a.priceINR - b.priceINR;
      if (sortBy === 'price-high') return b.priceINR - a.priceINR;
      if (sortBy === 'name-az') return a.title.localeCompare(b.title);
      return 0; // featured default ordering
    });
}
