import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { euroPrice } from '../../config/currency.js';

export default function ProductModal({ product, onClose }) {
  const dialogRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [...new Set([product.image, ...(product.images || [])])];
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, []);

  const moveZoom = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)),
    });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="product-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto border border-[#cbb99a] bg-paper p-0 text-ink shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-5 sm:p-8">
        <button
          autoFocus
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center border border-[#cbb99a] bg-paper text-ink transition hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust"
        >
          <X size={20} />
        </button>
        <div className="grid items-start gap-6 pt-10 sm:grid-cols-2 sm:gap-8">
          <div>
            <button
              type="button"
              aria-label={zoomed ? 'Zoom out of product image' : 'Zoom into product image'}
              aria-pressed={zoomed}
              onClick={(event) => {
                if (!zoomed) moveZoom(event);
                setZoomed((value) => !value);
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') {
                  moveZoom(event);
                  setZoomed(true);
                }
              }}
              onPointerMove={moveZoom}
              onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') {
                  setZoomed(false);
                  setZoomOrigin({ x: 50, y: 50 });
                }
              }}
              onBlur={() => setZoomed(false)}
              className={`block aspect-square w-full overflow-hidden border border-[#dcd1be] bg-[#f2ebdf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust ${zoomed ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in'}`}
            >
              <img
                src={images[imageIndex]}
                alt={`${product.title} — view ${imageIndex + 1}`}
                draggable="false"
                className="pointer-events-none h-full w-full select-none object-contain transition-transform duration-150 motion-reduce:transition-none"
                style={{
                  transform: `scale(${zoomed ? 2.5 : 1})`,
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                }}
              />
            </button>
            {images.length > 1 && (
              <div
                className="mt-3 flex flex-wrap justify-center gap-2"
                role="group"
                aria-label="Product photos"
              >
                {images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`View photo ${index + 1} of ${product.title}`}
                    aria-pressed={imageIndex === index}
                    onClick={() => {
                      setImageIndex(index);
                      setZoomed(false);
                      setZoomOrigin({ x: 50, y: 50 });
                    }}
                    className={`h-16 w-16 cursor-pointer overflow-hidden border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust ${imageIndex === index ? 'border-rust' : 'border-transparent hover:border-[#cbb99a]'}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {product.originalImage && (
              <p className="mt-3 text-center text-[10px] text-[#77715f]">
                AI-styled catalogue image from our shop photo.{' '}
                <a
                  className="text-rust underline"
                  href={product.originalImage}
                  target="_blank"
                  rel="noreferrer"
                >
                  View original photo
                </a>
              </p>
            )}
            <p className="mt-3 text-center text-[10px] text-[#77715f]">
              Hover to zoom and move your cursor to inspect. On touch screens, tap to zoom and drag
              to explore.
            </p>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-rust">
              {product.category}
            </span>
            <h2
              id="product-modal-title"
              className="mt-3 font-serif text-3xl leading-tight sm:text-4xl"
            >
              {product.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#6d6a5e]">{product.description}</p>
            <dl className="mt-6 space-y-4 border-y border-[#dcd1be] py-5 text-xs">
              <div>
                <dt className="text-[9px] uppercase tracking-widest text-[#8c826e]">
                  Finish & details
                </dt>
                <dd className="mt-1.5">{product.materials}</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-widest text-[#8c826e]">Collection</dt>
                <dd className="mt-1.5">{product.origin}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xl font-semibold">
              {product.priceINR == null
                ? 'Price on request'
                : `₹${product.priceINR.toLocaleString('en-IN')}`}
            </p>
            <p className="mt-1 text-xs text-[#8c826e]">
              {product.priceINR != null && <>approx. {euroPrice(product.priceINR)} EUR</>}
            </p>
            <Link
              to="/#visit"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs text-paper transition hover:bg-rust"
            >
              Visit the store <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </dialog>
  );
}
