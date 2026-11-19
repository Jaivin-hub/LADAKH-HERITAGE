import { Eye, ArrowUpRight } from 'lucide-react';
import { euroPrice } from '../../config/currency.js';

export default function ProductCard({ product, onOpen }) {
  return (
    <div className="group bg-paper border border-[#dcd1be] flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-rust/60">
      <div>
        {/* Image Thumbnail with Overlay */}
        <div className="relative h-[250px] overflow-hidden bg-[#e5dbc9]">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-cover object-center ${product.originalImage ? '' : 'saturate-[.8]'} transition-transform duration-500 group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
            <span className="bg-ink/85 backdrop-blur-xs text-paper text-[8px] uppercase tracking-widest px-2 py-0.5 font-medium">
              {product.category}
            </span>
          </div>

          <span className="absolute top-3 right-3 bg-paper/90 text-rust text-[8px] uppercase tracking-wider px-2 py-0.5 font-bold border border-[#cbb99a]">
            {product.badge}
          </span>

          {/* Quick View Button */}
          <button
            onClick={() => onOpen(product)}
            className="absolute bottom-3 left-3 right-3 bg-paper/95 text-ink text-xs font-medium py-2 px-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-[#cbb99a]"
          >
            <Eye size={14} className="text-rust" /> View Details
          </button>
        </div>

        {/* Content Info */}
        <div className="p-4">
          <span className="text-[9px] text-[#8c826e] tracking-widest uppercase block mb-1">
            {product.origin}
          </span>

          <h3
            onClick={() => onOpen(product)}
            className="font-serif text-lg font-medium text-ink hover:text-rust cursor-pointer transition line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-[11px] text-[#6d6a5e] leading-relaxed line-clamp-2 mt-2 mb-3">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="px-4 pb-4 pt-2 border-t border-[#e8dfcf] flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-ink">
            {product.priceINR == null
              ? 'Price on request'
              : `₹${product.priceINR.toLocaleString('en-IN')}`}
          </div>
          <div className="text-[10px] text-[#8c826e]">
            {product.priceINR != null && <>approx. {euroPrice(product.priceINR)} EUR</>}
          </div>
        </div>

        <button
          onClick={() => onOpen(product)}
          className="grid h-8 w-8 place-items-center bg-ink text-paper transition hover:bg-rust"
          title="Inquire about object"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}
