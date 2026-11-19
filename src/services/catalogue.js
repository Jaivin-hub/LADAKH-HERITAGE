/** Public read-only catalogue API. No local catalogue fallback. */
export async function fetchCatalogue(baseUrl, signal, fetcher = fetch) {
  const base = baseUrl.replace(/\/$/, '');
  const read = async (resource) => {
    const response = await fetcher(`${base}/${resource}`, { signal });
    if (!response.ok) throw new Error(`Unable to load ${resource}`);
    const body = await response.json();
    if (!Array.isArray(body[resource])) throw new Error(`Invalid ${resource} response`);
    return body[resource];
  };
  const [products, categories] = await Promise.all([read('products'), read('categories')]);
  if (categories.some((item) => !item || typeof item.title !== 'string'))
    throw new Error('Invalid category record');
  if (
    products.some(
      (item) =>
        !item || !item.id || typeof item.title !== 'string' || typeof item.category !== 'string',
    )
  )
    throw new Error('Invalid product record');
  return {
    categories,
    products: products.map((item) => ({
      materials: '',
      origin: '',
      description: '',
      priceINR: null,
      ...item,
    })),
  };
}
