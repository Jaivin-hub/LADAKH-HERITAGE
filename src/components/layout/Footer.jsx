import { Link } from 'react-router-dom';
import { contactLinks } from '../../config/contact.js';

export default function Footer({ isProductsPage }) {
  return (
    <footer className="grid grid-cols-2 items-center gap-5 bg-ink px-[7%] py-[27px] text-paper sm:grid-cols-3 sm:px-[7.2%]">
      <Link
        to="/"
        className="flex items-center gap-3 text-xs tracking-[.16em] text-paper no-underline"
      >
        <img
          src="/ladakh-heritage-logo.png"
          alt=""
          width="40"
          height="40"
          className="h-10 w-10 shrink-0 object-contain"
        />
        LADAKH HERITAGE
      </Link>
      <span className="col-span-2 row-start-2 font-serif text-sm italic text-[#c5b9a3] sm:col-span-1 sm:row-auto sm:text-center">
        Objects with a soul. Stories that stay.
      </span>
      <Link
        to={isProductsPage ? '#products' : '#home'}
        className="justify-self-end text-[8px] tracking-[.15em] text-[#d4c7b0] no-underline"
      >
        BACK TO TOP ↑
      </Link>
      <div className="col-span-2 flex flex-col items-center gap-4 border-t border-white/15 pt-6 sm:col-span-3 sm:flex-row sm:justify-between">
        <p className="text-[9px] uppercase tracking-[.18em] text-[#c5b9a3]">Stay connected</p>
        <ul
          aria-label="Social media and contact"
          className="flex flex-wrap justify-center gap-3 sm:gap-5"
        >
          {contactLinks.map(({ label, icon: Icon, href }) => {
            const content = (
              <>
                <Icon size={18} aria-hidden="true" />
                <span className="text-[9px]">{label}</span>
              </>
            );
            const styles =
              'flex min-h-11 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm px-2 py-2 text-[#d4c7b0]';
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    aria-label={label}
                    target={href.startsWith('tel:') ? undefined : '_blank'}
                    rel={href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                    className={`${styles} transition hover:text-[#e8ba83] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a66a]`}
                  >
                    {content}
                  </a>
                ) : (
                  <span
                    aria-label={`${label} — coming soon`}
                    aria-disabled="true"
                    title={`${label} — coming soon`}
                    className={styles}
                  >
                    {content}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-span-2 mt-2 flex justify-between gap-4 pt-4 text-[7px] tracking-[.13em] text-[#a8a08f] sm:col-span-3 sm:text-[8px]">
        <span>© {new Date().getFullYear()} LADAKH HERITAGE</span>
        <span className="text-right">MADE WITH CURIOSITY IN VARKALA</span>
      </div>
    </footer>
  );
}
