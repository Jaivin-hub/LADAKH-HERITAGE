import { useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import usePageNavigation from './hooks/usePageNavigation.js';

export default function App() {
  const location = useLocation();
  const isProductsPage = location.pathname.replace(/\/$/, '') === '/products';
  usePageNavigation(location, isProductsPage);

  return (
    <div className="overflow-x-clip bg-paper text-ink min-h-screen">
      <Header isProductsPage={isProductsPage} />
      {/* Offset for the fixed announcement and navigation header. */}
      <main className="pt-[110px] sm:pt-[118px]">
        {isProductsPage ? <ProductsPage /> : <HomePage />}
      </main>
      <Footer isProductsPage={isProductsPage} />
    </div>
  );
}
