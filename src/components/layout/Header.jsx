import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Header({ isProductsPage }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  useEffect(closeMenu, [location.pathname, location.search]);
  const activeNav = isProductsPage
    ? '/products'
    : location.hash === '#story'
      ? '/#story'
      : location.hash === '#visit'
        ? '/#visit'
        : '/';
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top Announcement Banner */}
      <div className="flex h-[34px] items-center justify-center gap-2.5 bg-ink px-2 text-center text-[8px] tracking-[.06em] text-paper sm:text-[10px] sm:tracking-[.09em]">
        <span className="h-[5px] w-[5px] rounded-full bg-[#c6a66a]" />A LITTLE WORLD OF TREASURES,
        TUCKED AWAY IN VARKALA
        <span className="ml-1 text-[#c6a66a]">✳</span>
      </div>

      {/* Navigation Header */}
      <header className="flex h-[76px] w-full items-center justify-between border-b border-ink/20 bg-paper/95 px-[5%] shadow-sm backdrop-blur-md sm:h-[84px] sm:px-[7.2%]">
        <Link
          to="/"
          aria-label="Ladakh Heritage home"
          className="flex items-center gap-3 text-ink no-underline"
        >
          <img
            src="/ladakh-heritage-logo.png"
            alt=""
            width="48"
            height="48"
            className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
          />
          <span className="flex flex-col gap-1">
            <strong className="text-[10px] tracking-[.16em] sm:text-xs">LADAKH HERITAGE</strong>
            <small className="text-[7px] tracking-[.25em] text-[#77715e] sm:text-[8px]">
              OBJECTS WITH A SOUL
            </small>
          </span>
        </Link>

        <nav
          className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-[110px] flex-col border-b border-ink/20 bg-paper/98 px-[6%] pb-6 shadow-md backdrop-blur-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-9 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: 'Products' },
            { to: '/#story', label: 'Our world' },
            { to: '/#visit', label: 'Find us' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              onClick={closeMenu}
              to={to}
              aria-current={activeNav === to ? (to.includes('#') ? 'location' : 'page') : undefined}
              className={`border-b border-[#ddd3c2] py-3.5 text-xs transition-colors hover:text-rust sm:border-0 sm:py-0 ${activeNav === to ? 'text-rust font-semibold underline decoration-rust underline-offset-8' : 'text-ink no-underline'}`}
            >
              {label}
            </Link>
          ))}
          <Link
            onClick={closeMenu}
            to="/#visit"
            className="mt-3 flex items-center justify-center gap-2.5 border border-ink px-4 py-3 text-xs text-ink no-underline transition hover:bg-ink hover:text-paper sm:mt-0"
          >
            Visit the store <ArrowUpRight size={15} />
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          className="border-0 bg-transparent text-ink focus:outline-none sm:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
    </div>
  );
}
