/** Resolve server uploads against the configured API, preserving external CDN URLs. */
export function mediaUrl(value, baseUrl) {
  if (typeof value !== 'string' || !value) return value;
  const origin = globalThis.location?.origin || 'http://localhost';
  const api = new URL(baseUrl, origin);
  if (value.startsWith('/uploads/')) return new URL(value, api).href;
  try {
    const image = new URL(value);
    if (['localhost', '127.0.0.1', '[::1]'].includes(image.hostname) &&
        image.pathname.startsWith('/uploads/')) {
      return new URL(image.pathname + image.search + image.hash, api).href;
    }
  } catch { /* Leave non-upload assets unchanged. */ }
  return value;
}

export function resolveMedia(item, baseUrl) {
  return {
    ...item,
    ...(item.image !== undefined ? { image: mediaUrl(item.image, baseUrl) } : {}),
    ...(item.originalImage !== undefined ? { originalImage: mediaUrl(item.originalImage, baseUrl) } : {}),
    ...(Array.isArray(item.images) ? { images: item.images.map(value => mediaUrl(value, baseUrl)) } : {}),
  };
}
