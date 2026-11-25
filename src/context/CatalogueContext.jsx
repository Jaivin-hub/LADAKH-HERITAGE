import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCategories } from '../services/catalogue.js';
import { API_BASE_URL } from '../config/api.js';
const CatalogueContext = createContext(null);
export function CatalogueProvider({ children }) {
  const [catalogue, setCatalogue] = useState({ categories: [], status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let active = true;
    setCatalogue({ categories: [], status: 'loading' });
    fetchCategories(API_BASE_URL, controller.signal)
      .then((categories) => {
        if (active) setCatalogue({ categories, status: 'ready' });
      })
      .catch(() => {
        if (active) setCatalogue({ categories: [], status: 'error' });
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
