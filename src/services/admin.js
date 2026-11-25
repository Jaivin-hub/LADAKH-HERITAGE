import { readApiResponse } from './response.js';
import { API_BASE_URL } from '../config/api.js';
export async function adminRequest(resource, data, signal) {
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/admin/${resource}`, {
    method: data ? 'POST' : 'GET',
    signal,
    ...(data
      ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
      : {}),
  });
  const body = await readApiResponse(response);
  return body;
}

export async function uploadAdminImages(files) {
  const data = new FormData();
  files.forEach((file) => data.append('images', file));
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/admin/uploads`, {
    method: 'POST',
    body: data,
  });
  const body = await readApiResponse(response);
  return body.images;
}

export function adminImageUrl(path) {
  if (!path || !path.startsWith('/uploads/')) return path;
  return new URL(path, new URL(API_BASE_URL, window.location.origin)).href;
}
