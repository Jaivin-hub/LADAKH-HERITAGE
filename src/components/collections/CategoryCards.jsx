import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext.jsx';
import CatalogueStatus from '../products/CatalogueStatus.jsx';

export default function CategoryCards({ items }) {
  const { categories, status, retry } = useCatalogue();
  const displayedItems = items ?? categories.filter((item) => !item.parentCategory);
  if (status !== 'ready' || !displayedItems.length)
    return <CatalogueStatus status={status} retry={retry} empty />;
  return (
    <div className="collection-grid grid gap-5">
      {displayedItems.map((item, index) => (
        <Link
          key={item.title}
          to={item.to || `/products?category=${encodeURIComponent(item.title)}`}
          aria-label={`Explore ${item.title}`}
          className={`group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden bg-[#30261e] p-7 text-[#fff9ef] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust sm:p-9 sm:min-h-[340px]`}
        >
          {item.image && (
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />
          <span className="mb-3 text-[10px] uppercase tracking-[.24em] text-[#e5cc9f]">
            THE COLLECTION · {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-md">
              <h3 className="font-serif text-[30px] leading-[1.08] sm:text-[36px]">{item.title}</h3>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#eee0cc]">{item.text}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[3px] border border-white/50 transition group-hover:bg-[#fff9ef] group-hover:text-[#30261e]">
              <ArrowUpRight size={20} />
            </span>
          </div>
          <span className="mt-5 text-[10px] uppercase tracking-[.16em]">Explore collection</span>
        </Link>
      ))}
    </div>
  );
}
