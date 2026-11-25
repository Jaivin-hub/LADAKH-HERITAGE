/** Read-only API client. Never falls back to the archived local catalogue. */
async function read(baseUrl, resource, signal, fetcher) {
  const response = await fetcher(`${baseUrl.replace(/\/$/, '')}/${resource}`, { signal });
  if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`);
  return response.json();
}
export async function fetchCategories(baseUrl, signal, fetcher = fetch) {
  const body = await read(baseUrl, 'categories', signal, fetcher);
  if (
    !Array.isArray(body.categories) ||
    body.categories.some(
      (item) => !item || typeof item.title !== 'string' || typeof item.slug !== 'string',
    )
  )
    throw new Error('Invalid categories response');
  return body.categories;
}
export async function fetchProducts(baseUrl, filters, signal, fetcher = fetch) {
  const params = new URLSearchParams({
    page: String(filters.page),
    limit: String(filters.limit),
    sort: filters.sort,
  });
  if (filters.category && filters.category !== 'All Treasures')
    params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  const body = await read(baseUrl, `products?${params}`, signal, fetcher);
  if (
    !Array.isArray(body.products) ||
    body.products.some(
      (item) =>
        !item || !item.id || typeof item.title !== 'string' || typeof item.category !== 'string',
    )
  )
    throw new Error('Invalid products response');
  const p = body.pagination;
  if (
    !p ||
    ![p.page, p.limit, p.totalPages].every((value) => Number.isInteger(value) && value > 0) ||
    !Number.isInteger(p.total) ||
    p.total < 0
  )
    throw new Error('Invalid pagination response');
  return body;
}
