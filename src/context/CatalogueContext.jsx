import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCatalogue } from '../services/catalogue.js';

const CatalogueContext = createContext(null);
const baseUrl = import.meta.env.VITE_CATALOGUE_API_URL?.trim();

export function CatalogueProvider({ children }) {
  const [catalogue, setCatalogue] = useState({
    products: [],
    categories: [],
    status: baseUrl ? 'loading' : 'unconfigured',
  });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!baseUrl) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let active = true;
    setCatalogue({ products: [], categories: [], status: 'loading' });
    fetchCatalogue(baseUrl, controller.signal)
      .then((data) => {
        if (active) setCatalogue({ ...data, status: 'ready' });
      })
      .catch(() => {
        if (active) setCatalogue({ products: [], categories: [], status: 'error' });
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);
  return (
    <CatalogueContext.Provider
      value={{ ...catalogue, retry: () => setAttempt((value) => value + 1) }}
    >
      {children}
    </CatalogueContext.Provider>
  );
}

export function useCatalogue() {
  return useContext(CatalogueContext);
}
