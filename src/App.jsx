import { Link, useLocation } from 'react-router-dom';
import { jewelleryProducts } from './jewelleryProducts.js';
import { braceletProducts } from './braceletProducts.js';
import { shopBraceletProducts } from './shopBraceletProducts.js';
import { pendantProducts } from './pendantProducts.js';
import { victoryProducts } from './victoryProducts.js';
import { silverPendantProducts } from './silverPendantProducts.js';
import { necklaceProducts } from './necklaceProducts.js';
import { marcasiteBraceletProducts } from './marcasiteBraceletProducts.js';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, MapPin, Menu, X, Search, SlidersHorizontal, Eye, ShoppingBag, Sparkles, Instagram, Send, Phone } from 'lucide-react';

function WhatsAppIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.8A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="m8.1 7.3 1.5 2.5-1 1.1a8.4 8.4 0 0 0 4.4 4.1l1-1.2 2.6 1.3c-.4 1.7-1.5 2.2-3.1 1.6-3.5-1.3-6-3.8-7-6.7-.4-1.3.2-2.4 1.6-2.7Z" />
    </svg>
  );
}

// Store social profiles and contact actions.
const contactLinks = [
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ladakhher?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw==' },
  { label: 'Telegram', icon: Send, href: 'https://t.me/Latiflidoo' },
  { label: 'WhatsApp', icon: WhatsAppIcon, href: 'https://wa.me/919746373670' },
  { label: 'Phone', icon: Phone, href: 'tel:+919746373670' },
];

const collections = [
  { title: 'Victorys vintage jewelrys', image: '/categories/victory-vintage.png', text: 'Discover ornate vintage rings and earrings, rich colours and delicate details.' },
  { title: 'Marcasite Vintage Pendants', image: '/categories/pendants.png', text: 'Explore vintage pendants with intricate metalwork, colourful stones and distinctive motifs.' },
  { title: 'Precious & Semi-Precious Stones', image: '/categories/stones.png', text: 'Discover colour, character and natural beauty in every stone.' },
  { title: 'Gold Jewellery', image: '/categories/gold.png', text: 'Explore jewellery with the timeless warmth of gold.' },
  { title: 'Silver Jewellery', image: '/categories/silver.png', text: 'Find distinctive silver pieces full of detail and character.' },
  { title: 'Custom Jewellery', image: '/categories/custom.png', text: 'Talk to us about creating a piece that feels personal to you.' },
  { title: 'Jewellery Repairing', image: '/categories/repair.png', text: 'Visit us to discuss the care and repair of your treasured pieces.' },
  { title: 'Heritage Objects', image: '/categories/heritage.png', text: 'Discover carved keepsakes, decorative vessels and objects with a story.' },
];
const braceletCategory = 'Marcasite Vintage Silver Bracelets';
const necklaceCategory = 'Vintage Silver Necklaces';
const silverPendantCategory = 'Vintage Silver Pendants';
const silverSubcategories = [braceletCategory, necklaceCategory, silverPendantCategory];
const categoryTabs = ['All Treasures', ...collections.map(({ title }) => title), ...silverSubcategories];
function categoryFromSearch(search) {
  const params = new URLSearchParams(search);
  if (params.get('category') === 'Silver Jewellery' && params.get('subcategory') === 'vintage-pendants') return silverPendantCategory;
  if (params.get('category') === 'Silver Jewellery' && params.get('subcategory') === 'vintage-necklaces') return necklaceCategory;
  return params.get('category') === 'Silver Jewellery' && params.get('subcategory') === 'marcasite-bracelets' ? braceletCategory : params.get('category');
}
// ECB reference rate, 2 November 2026. Indicative only; update periodically.
// https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-inr.en.html
const INR_PER_EUR = 106.4505;
const euroPrice = (inr) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(inr / INR_PER_EUR);
const heroImages = ['/hero/antique-handicrafts.png', '/hero/heritage-still-life.png', '/hero/amber-treasures.png', '/hero/silver-heirlooms.png'];


const silverBraceletCollection = { title: "Marcasite Vintage Silver Bracelets", image: "/categories/marcasite-silver-bracelets.png", text: "Discover delicate floral links, colourful stones and intricate vintage silver designs.", to: "/products?category=Silver%20Jewellery&subcategory=marcasite-bracelets" };

const silverNecklaceCollection = { title: necklaceCategory, image: "/categories/vintage-silver-necklaces.png", text: "Discover sculptural pendants, intricate silver fringe and beautifully detailed vintage necklaces.", to: "/products?category=Silver%20Jewellery&subcategory=vintage-necklaces" };

const silverPendantCollection = { title: silverPendantCategory, image: "/categories/vintage-silver-pendants.png", text: "Discover colourful stones, sculptural motifs and intricate vintage silver pendants.", to: "/products?category=Silver%20Jewellery&subcategory=vintage-pendants" };

function CategoryCards({ items = collections }) {
  return (
    <div className="collection-grid grid gap-5">
      {items.map((item, index) => (
        <Link key={item.title} to={item.to || `/products?category=${encodeURIComponent(item.title)}`}
          aria-label={`Explore ${item.title}`}
          className={`group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden bg-[#30261e] p-7 text-[#fff9ef] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust sm:p-9 sm:min-h-[340px]`}>
          <img src={item.image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />
          <span className="mb-3 text-[10px] uppercase tracking-[.24em] text-[#e5cc9f]">THE COLLECTION · {String(index + 1).padStart(2, '0')}</span>
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-md"><h3 className="font-serif text-[30px] leading-[1.08] sm:text-[36px]">{item.title}</h3>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#eee0cc]">{item.text}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[3px] border border-white/50 transition group-hover:bg-[#fff9ef] group-hover:text-[#30261e]"><ArrowUpRight size={20} /></span>
          </div>
          <span className="mt-5 text-[10px] uppercase tracking-[.16em]">Explore collection</span>
        </Link>
      ))}
    </div>
  );
}

function HeroBackground() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const start = () => {
      clearInterval(timer);
      if (!paused && !preference.matches) timer = setInterval(() => setSlide((index) => (index + 1) % heroImages.length), 4000);
    };
    start();
    preference.addEventListener('change', start);
    return () => { clearInterval(timer); preference.removeEventListener('change', start); };
  }, [paused]);
  return <>
    <div className="absolute inset-0" aria-hidden="true">
      {heroImages.map((src, index) => <img key={src} src={src} alt="" fetchPriority={index === 0 ? 'high' : 'auto'} className={`absolute inset-0 h-full w-full object-cover object-[65%_center] transition-opacity duration-1000 motion-reduce:transition-none sm:object-center ${slide === index ? 'opacity-100' : 'opacity-0'}`} />)}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,240,231,0.96)_0%,rgba(245,240,231,0.88)_35%,rgba(245,240,231,0.12)_75%)] max-sm:bg-paper/80" />
    </div>
    <div className="absolute bottom-5 right-[7%] z-10 flex items-center gap-2 rounded-full bg-ink/80 px-3 py-2 text-paper">
      {heroImages.map((src, index) => <button key={src} type="button" aria-label={`Show background ${index + 1}`} aria-pressed={slide === index} onClick={() => setSlide(index)} className="grid h-8 w-8 cursor-pointer place-items-center"><span className={`h-2 w-2 rounded-full ${slide === index ? 'bg-paper' : 'bg-paper/40'}`} /></button>)}
      <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} className="cursor-pointer px-2 py-2 text-[10px]">{paused ? 'Play' : 'Pause'}</button>
    </div>
  </>;
}

const productsData = [
...silverPendantProducts,
...necklaceProducts,
...marcasiteBraceletProducts,
...victoryProducts,
...pendantProducts,
...shopBraceletProducts,
...braceletProducts,
...jewelleryProducts,
{"id": "lh-pink-stone-ducks", "title": "Pink Stone Duck Collection", "category": "Precious & Semi-Precious Stones", "materials": "Pale pink polished stone; mineral identity to be confirmed", "description": "Carved stone ducks in several sizes, displayed on a rough stone base. Ask the store about individual pieces and availability.", "priceINR": null, "origin": "Ladakh Heritage \u00b7 Varkala", "badge": "In the Store", "image": "/products/pink-stone-ducks.png", "originalImage": "/products/pink-stone-ducks-original.jpeg"},
{"id": "lh-ornate-metal-ewer", "title": "Ornate Metal Ewer", "category": "Heritage Objects", "materials": "Warm metal tones with engraved and raised details", "description": "A tall decorative ewer with a curved spout, sculptural handle, chained lid and richly patterned pedestal base.", "priceINR": null, "origin": "Ladakh Heritage \u00b7 Varkala", "badge": "In the Store", "image": "/products/ornate-metal-ewer.png", "originalImage": "/products/ornate-metal-ewer-original.jpeg"},
{"id": "lh-sculptural-handle-teapot", "title": "Sculptural Handle Teapot", "category": "Heritage Objects", "materials": "Aged metal finish with relief ornament", "description": "A rounded decorative teapot with an elaborate handle, curved spout, chained domed lid and raised ornamental details.", "priceINR": null, "origin": "Ladakh Heritage \u00b7 Varkala", "badge": "In the Store", "image": "/products/sculptural-handle-teapot.png", "originalImage": "/products/sculptural-handle-teapot-original.jpeg"},
  {
    id: 'lh-p1',
    title: 'Aged Brass Handbell',
    category: 'Heritage Objects',
    priceINR: 18500,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Brass-toned finish',
    badge: 'Classic Form',
    image: '/products/AgedBrass.png',
    description: 'A softly weathered handbell with a rounded dome, slender handle and warm golden finish.'
  },
  {
    id: 'lh-p2',
    title: 'Bronze Elephant Figurine',
    category: 'Heritage Objects',
    priceINR: 14200,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Bronze-toned finish',
    badge: 'Sculptural Detail',
    image: '/products/BronzeElephant.png',
    description: 'An elephant with a raised trunk, patterned saddle and richly textured bronze-toned finish.'
  },
  {
    id: 'lh-p3',
    title: 'Carved Wooden Figure',
    category: 'Heritage Objects',
    priceINR: 11500,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Wooden appearance',
    badge: 'Carved Detail',
    image: '/products/CarvedReddish.png',
    description: 'A reddish wooden figure with an ornate headdress, flowing details and a warm, textured surface.'
  },
  {
    id: 'lh-p4',
    title: 'Nataraja Sculpture',
    category: 'Heritage Objects',
    priceINR: 8800,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Aged metal finish',
    badge: 'Circular Form',
    image: '/products/CircularBronze.png',
    description: 'A dancing figure framed by a circular ring of flames, with intricate details and an aged metal finish.'
  },
  {
    id: 'lh-p5',
    title: 'Brass Crane Sculpture',
    category: 'Heritage Objects',
    priceINR: 24500,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Dark brass-toned finish',
    badge: 'Graceful Form',
    image: '/products/DarkBrass.png',
    description: 'A graceful long-necked bird with slender legs and finely patterned wings in deep brass tones.'
  },
  {
    id: 'lh-p6',
    title: 'Aged Brass Bowl',
    category: 'Heritage Objects',
    priceINR: 16000,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Brass-toned finish',
    badge: 'Quiet Character',
    image: '/products/LadakhHeritage.png',
    description: 'A simple rounded bowl with a softly flared rim and a warm, timeworn brass-toned surface.'
  },
  {
    id: 'lh-p7',
    title: 'Ornate Brass Door Knocker',
    category: 'Heritage Objects',
    priceINR: 12500,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Brass-toned finish',
    badge: 'Ornate Detail',
    image: '/products/OrnateBrass.png',
    description: 'An expressive sculpted face holds a circular ring, surrounded by decorative details in warm brass tones.'
  },
  {
    id: 'lh-p8',
    title: 'Seated Deity Sculpture',
    category: 'Heritage Objects',
    priceINR: 32000,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Aged metal finish',
    badge: 'Sculptural Detail',
    image: '/products/Ornateseated.png',
    description: 'A seated figure with a detailed crown, flowing ornaments and a decorative base in warm metal tones.'
  },
  {
    id: 'lh-p9',
    title: 'Painted Elephant Plaque',
    category: 'Heritage Objects',
    priceINR: 6500,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Painted decorative surface',
    badge: 'Floral Motifs',
    image: '/products/PaintedElephant.png',
    description: 'A decorative elephant silhouette patterned with flowers in muted orange, cream and earthy green.'
  },
  {
    id: 'lh-p10',
    title: 'Painted Decorative Plate',
    category: 'Heritage Objects',
    priceINR: 13500,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Painted decorative surface',
    badge: 'Story in Colour',
    image: '/products/PaintedIndian.png',
    description: 'A colourful figurative scene framed by a floral border, with gentle earth tones and a weathered appearance.'
  },
  {
    id: 'lh-p11',
    title: 'Red Singing Bowl',
    category: 'Heritage Objects',
    priceINR: 19800,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Red and gold-toned finish',
    badge: 'Warm Tones',
    image: '/products/Redsinging.png',
    description: 'A deep red bowl with a dark interior, golden rim and delicate decorative motifs around its surface.'
  },
  {
    id: 'lh-p12',
    title: 'Sculpted Brass Chess Set',
    category: 'Heritage Objects',
    priceINR: 9200,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Brass-toned pieces and wooden-style board',
    badge: 'Decorative Set',
    image: '/products/Sculptedbrass.png',
    description: 'An ornate chess set featuring sculpted figures on a richly patterned board with a wooden-style frame.'
  },
  {
    id: 'lh-p13',
    title: 'Seated Buddha Sculpture',
    category: 'Heritage Objects',
    priceINR: 9200,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Aged metal finish',
    badge: 'Serene Form',
    image: '/products/Seatedmeditatin.png',
    description: 'A meditating Buddha on a decorative base, with flowing robe details and a softly aged metal finish.'
  },
  {
    id: 'lh-p14',
    title: 'Engraved Lidded Vase',
    category: 'Heritage Objects',
    priceINR: 9200,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Engraved metal appearance',
    badge: 'Engraved Detail',
    image: '/products/Tallengraved.png',
    description: 'A tall covered vessel with a rounded finial and flowing floral patterns across a dark metal surface.'
  },
  {
    id: 'lh-p15',
    title: 'Tiered Brass Tower',
    category: 'Heritage Objects',
    priceINR: 9200,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Brass-toned finish',
    badge: 'Architectural Detail',
    image: '/products/TieredBrass.png',
    description: 'A tapering decorative tower with layered tiers, miniature arches and an intricately detailed base.'
  },
  {
    id: 'lh-p16',
    title: 'Turquoise Lidded Vessel',
    category: 'Heritage Objects',
    priceINR: 9200,
    origin: 'Ladakh Heritage · Varkala',
    materials: 'Turquoise-coloured and gold-toned finish',
    badge: 'Decorative Vessel',
    image: '/products/Turquoiselidded.png',
    description: 'A rounded turquoise-coloured vessel with a sculpted handle, domed lid and ornate golden accents.'
  }
];

const Eyebrow = ({ children, center = false }) => (
  <div className={`flex items-center gap-3 text-[9px] font-bold tracking-[.19em] text-[#79745f] ${center ? 'justify-center' : ''}`}>
    <span className="inline-block h-px w-[26px] bg-rust" />
    {children}
  </div>
);


function ProductModal({ product, onClose }) {
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
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto border border-[#cbb99a] bg-paper p-0 text-ink shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-5 sm:p-8">
        <button autoFocus onClick={onClose} aria-label="Close product details" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center border border-[#cbb99a] bg-paper text-ink transition hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust">
          <X size={20} />
        </button>
        <div className="grid items-start gap-6 pt-10 sm:grid-cols-2 sm:gap-8">
          <div>
            <button
              type="button"
              aria-label={zoomed ? 'Zoom out of product image' : 'Zoom into product image'}
              aria-pressed={zoomed}
              onClick={(event) => { if (!zoomed) moveZoom(event); setZoomed((value) => !value); }}
              onPointerEnter={(event) => { if (event.pointerType === 'mouse') { moveZoom(event); setZoomed(true); } }}
              onPointerMove={moveZoom}
              onPointerLeave={(event) => { if (event.pointerType === 'mouse') { setZoomed(false); setZoomOrigin({ x: 50, y: 50 }); } }}
              onBlur={() => setZoomed(false)}
              className={`block aspect-square w-full overflow-hidden border border-[#dcd1be] bg-[#f2ebdf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust ${zoomed ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in'}`}
            >
              <img src={images[imageIndex]} alt={`${product.title} — view ${imageIndex + 1}`} draggable="false" className="pointer-events-none h-full w-full select-none object-contain transition-transform duration-150 motion-reduce:transition-none" style={{ transform: `scale(${zoomed ? 2.5 : 1})`, transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }} />
            </button>
            {images.length > 1 && (
              <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Product photos">
                {images.map((src, index) => (
                  <button key={src} type="button" aria-label={`View photo ${index + 1} of ${product.title}`} aria-pressed={imageIndex === index}
                    onClick={() => { setImageIndex(index); setZoomed(false); setZoomOrigin({ x: 50, y: 50 }); }}
                    className={`h-16 w-16 cursor-pointer overflow-hidden border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust ${imageIndex === index ? 'border-rust' : 'border-transparent hover:border-[#cbb99a]'}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {product.originalImage && <p className="mt-3 text-center text-[10px] text-[#77715f]">AI-styled catalogue image from our shop photo. <a className="text-rust underline" href={product.originalImage} target="_blank" rel="noreferrer">View original photo</a></p>}
            <p className="mt-3 text-center text-[10px] text-[#77715f]">Hover to zoom and move your cursor to inspect. On touch screens, tap to zoom and drag to explore.</p>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-rust">{product.category}</span>
            <h2 id="product-modal-title" className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{product.title}</h2>
            <p className="mt-5 text-sm leading-relaxed text-[#6d6a5e]">{product.description}</p>
            <dl className="mt-6 space-y-4 border-y border-[#dcd1be] py-5 text-xs">
              <div><dt className="text-[9px] uppercase tracking-widest text-[#8c826e]">Finish & details</dt><dd className="mt-1.5">{product.materials}</dd></div>
              <div><dt className="text-[9px] uppercase tracking-widest text-[#8c826e]">Collection</dt><dd className="mt-1.5">{product.origin}</dd></div>
            </dl>
            <p className="mt-6 text-xl font-semibold">{product.priceINR == null ? 'Price on request' : `₹${product.priceINR.toLocaleString('en-IN')}`}</p>
            <p className="mt-1 text-xs text-[#8c826e]">{product.priceINR != null && <>approx. {euroPrice(product.priceINR)} EUR</>}</p>
            <Link to="/#visit" onClick={onClose} className="mt-6 inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs text-paper transition hover:bg-rust">Visit the store <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function App() {
  const location = useLocation();
  const isProductsPage = location.pathname.replace(/\/$/, '') === '/products';
  const catalogueRequested = categoryTabs.includes(categoryFromSearch(location.search));
  const activeNav = isProductsPage ? '/products' : location.hash === '#story' ? '/#story' : location.hash === '#visit' ? '/#visit' : '/';
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = categoryFromSearch(location.search);
    return categoryTabs.includes(category) ? category : 'All Treasures';
  });

  useEffect(() => {
    document.title = isProductsPage
      ? 'Products — Ladakh Heritage'
      : 'Ladakh Heritage — Treasures with a Story';
  }, [isProductsPage]);
  const categoryRailRef = useRef(null);
  useEffect(() => {
    const rail = categoryRailRef.current;
    const active = rail?.querySelector('[aria-pressed="true"]');
    if (active) rail.scrollTo({ left: active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' });
  }, [selectedCategory]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const category = categoryFromSearch(location.search);
    setSelectedCategory(categoryTabs.includes(category) ? category : 'All Treasures');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    setActiveModalProduct(null);
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = location.hash && document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);

  const productsPerPage = 8;
  const handleOpenProductModal = (product) => setActiveModalProduct(product);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);





  const filteredProducts = useMemo(() => {
    return productsData
      .filter((item) => {
        const matchesCategory = 
          selectedCategory === 'All Treasures' || item.category === selectedCategory || item.parentCategory === selectedCategory;
        const matchesSearch = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low' || sortBy === 'price-high') {
          if (a.priceINR == null) return b.priceINR == null ? 0 : 1;
          if (b.priceINR == null) return -1;
        }
        if (sortBy === 'price-low') return a.priceINR - b.priceINR;
        if (sortBy === 'price-high') return b.priceINR - a.priceINR;
        if (sortBy === 'name-az') return a.title.localeCompare(b.title);
        return 0; // featured default ordering
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const visibleProducts = filteredProducts.slice((safePage - 1) * productsPerPage, safePage * productsPerPage);
  const goToProductPage = (page) => {
    setCurrentPage(page);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="overflow-x-clip bg-paper text-ink min-h-screen">
      {/* Fixed Sticky Header Wrapper (Banner + Navigation) */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        {/* Top Announcement Banner */}
        <div className="flex h-[34px] items-center justify-center gap-2.5 bg-ink px-2 text-center text-[8px] tracking-[.06em] text-paper sm:text-[10px] sm:tracking-[.09em]">
          <span className="h-[5px] w-[5px] rounded-full bg-[#c6a66a]" />
          A LITTLE WORLD OF TREASURES, TUCKED AWAY IN VARKALA
          <span className="ml-1 text-[#c6a66a]">✳</span>
        </div>

        {/* Navigation Header */}
        <header className="flex h-[76px] w-full items-center justify-between border-b border-ink/20 bg-paper/95 px-[5%] shadow-sm backdrop-blur-md sm:h-[84px] sm:px-[7.2%]">
          <Link to="/" aria-label="Ladakh Heritage home" className="flex items-center gap-3 text-ink no-underline">
            <img src="/ladakh-heritage-logo.png" alt="" width="48" height="48" className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12" />
            <span className="flex flex-col gap-1">
              <strong className="text-[10px] tracking-[.16em] sm:text-xs">LADAKH HERITAGE</strong>
              <small className="text-[7px] tracking-[.25em] text-[#77715e] sm:text-[8px]">OBJECTS WITH A SOUL</small>
            </span>
          </Link>

          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-[110px] flex-col border-b border-ink/20 bg-paper/98 px-[6%] pb-6 shadow-md backdrop-blur-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-9 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}>
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Products' },
              { to: '/#story', label: 'Our world' },
              { to: '/#visit', label: 'Find us' },
            ].map(({ to, label }) => (
              <Link key={to} onClick={closeMenu} to={to}
                aria-current={activeNav === to ? (to.includes('#') ? 'location' : 'page') : undefined}
                className={`border-b border-[#ddd3c2] py-3.5 text-xs transition-colors hover:text-rust sm:border-0 sm:py-0 ${activeNav === to ? 'text-rust font-semibold underline decoration-rust underline-offset-8' : 'text-ink no-underline'}`}>
                {label}
              </Link>
            ))}
            <Link onClick={closeMenu} to="/#visit" className="mt-3 flex items-center justify-center gap-2.5 border border-ink px-4 py-3 text-xs text-ink no-underline transition hover:bg-ink hover:text-paper sm:mt-0">
              Visit the store <ArrowUpRight size={15} />
            </Link>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" className="border-0 bg-transparent text-ink focus:outline-none sm:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      </div>

      {/* Main Container padding accounts for Banner (34px) + Header (76px / 84px) */}
      <main className="pt-[110px] sm:pt-[118px]">
        {!isProductsPage && <>
        <section id="home" className="relative isolate flex min-h-[620px] items-center overflow-hidden px-[7%] py-20 sm:min-h-[660px] lg:px-[11%]">
          <HeroBackground />
          <div className="relative z-10 max-w-[490px] pb-8">
            <Eyebrow>A DISCOVERY IN VARKALA</Eyebrow>
            <h1 className="my-6 font-serif text-[clamp(60px,17vw,78px)] leading-[.99] tracking-[-.045em] sm:my-7 sm:text-[62px] lg:text-[clamp(56px,6vw,88px)]">
              Not just found.<br />
              <em className="font-normal text-rust">Felt.</em>
            </h1>
            <p className="max-w-[380px] text-[13px] leading-[1.85] text-[#6d6a5e] sm:text-sm">
              A thoughtfully gathered collection of jewellery, precious stones and heritage treasures — each with a story waiting to become yours.
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Link to="/products" className="inline-flex items-center gap-5 bg-ink px-5 py-4 text-[11px] text-paper no-underline transition hover:bg-rust">
                Explore our treasures <ArrowRight size={17} />
              </Link>
              <Link to="/#story" className="inline-flex items-center gap-2 border-b border-[#b8b09e] pb-1.5 text-[10px] text-ink no-underline hover:text-rust">
                The story behind the store <ArrowDownRight size={17} />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[10px] leading-[1.7] text-[#77715e] sm:mt-[57px]">
              <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-[#b6a27e] font-serif text-xs text-rust">LH</span>
              <span>
                Curiosities from near and far<br />
                <b className="font-medium text-ink">Found on Papanasam Beach Road</b>
              </span>
            </div>
          </div>

        </section>

        <div className="heritage-marquee overflow-hidden border-y border-[#c9bda6] bg-sand">
          <div className="heritage-marquee-track flex w-max py-[17px] text-[8px] tracking-[.2em] text-[#5e5b48] sm:text-[9px]">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex min-w-[100vw] shrink-0 items-center justify-around gap-6 pr-6 sm:gap-[38px] sm:pr-[38px]">
                {['TIMELESS OBJECTS', 'HANDPICKED FINDS', 'ROOTED IN CULTURE', 'MADE FOR YOUR STORY'].map((label) => (
                  <React.Fragment key={label}>
                    <span className="whitespace-nowrap">{label}</span>
                    <span aria-hidden="true" className="text-sm text-rust">✳</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="collections" className="px-[7%] py-[70px] sm:px-[7%] sm:py-20 lg:px-[10.5%] lg:py-[104px]">
          <div className="mb-7 sm:mb-[43px] sm:flex sm:items-end sm:justify-between sm:gap-10">
            <div>
              <Eyebrow>THE COLLECTION</Eyebrow>
              <h2 className="mt-5 font-serif text-[47px] leading-[1.06] tracking-[-.04em] sm:text-[clamp(44px,4.5vw,62px)]">
                Little wonders.<br />
                <em className="font-normal text-rust">Lasting meaning.</em>
              </h2>
            </div>
            <p className="mt-5 max-w-[300px] text-xs leading-[1.9] text-[#77715f] sm:mb-1.5 sm:mt-0">
              Some things catch your eye. Others stay with you long after you leave. Explore a few corners of our world.
            </p>
          </div>

          <CategoryCards />

          <div className="mt-11 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[8px] leading-relaxed tracking-[.13em] text-[#77715f] sm:gap-6 sm:tracking-[.16em]">
            <span>THE JOY IS IN THE FINDING</span>
            <span className="text-[17px] text-rust">✳</span>
            <span>COME WITH CURIOSITY. LEAVE WITH A STORY.</span>
          </div>
        </section>

          <div className="bg-paper px-[7%] pb-16 text-center">
            <Link to="/products?category=All%20Treasures" className="inline-flex items-center gap-3 bg-ink px-6 py-4 text-xs text-paper transition hover:bg-rust">View all products <ArrowRight size={16} /></Link>
          </div>
        </>}

        {isProductsPage && !catalogueRequested && (
          <section id="products" className="bg-paper px-[7%] py-10 sm:py-16 lg:px-[10.5%]">
            <h1 className="sr-only">Product collections</h1>
            <CategoryCards />
          </section>
        )}

        {isProductsPage && catalogueRequested && (
        /* Product catalogue */
        <section id="products" className="scroll-mt-[118px] bg-[#f2ebdf] border-t border-[#c9bda6] px-[5%] pt-5 pb-[70px] sm:px-[7%] sm:pt-6 sm:pb-20 lg:px-[9%] lg:pb-[100px]">
          <div className="max-w-7xl mx-auto">
            <Link to={silverSubcategories.includes(selectedCategory) ? "/products?category=Silver%20Jewellery" : "/products"} className="mb-6 inline-flex items-center gap-2 text-xs text-rust hover:underline">{silverSubcategories.includes(selectedCategory) ? "← Silver Jewellery" : "← All categories"}</Link>
            <div role="search" aria-label="Filter products" className="catalogue-filter sticky top-[110px] z-30 mb-7 rounded-[3px] border border-[#d4c5ad] bg-paper/95 shadow-[0_5px_18px_-10px_#45362266] backdrop-blur-md sm:top-[118px]">
              <div className="flex items-center gap-2 border-b border-[#ddd2bf] px-3 sm:px-4">
                <button aria-label="Previous categories" onClick={() => categoryRailRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="hidden h-8 w-8 shrink-0 cursor-pointer rounded-[3px] border border-[#d4c5ad] text-rust hover:bg-sand md:block">←</button>
                <div ref={categoryRailRef} role="group" aria-label="Product categories" className="category-rail relative flex min-w-0 flex-1 gap-2 overflow-x-auto py-3">
                  {categoryTabs.map(cat => <button key={cat} aria-pressed={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} className={`shrink-0 cursor-pointer whitespace-nowrap rounded-[3px] border px-4 py-2.5 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${selectedCategory === cat ? 'border-rust bg-rust text-white' : 'border-[#d4c5ad] bg-transparent text-ink hover:border-rust hover:bg-sand/50'}`}>{cat}</button>)}
                </div>
                <button aria-label="More categories" onClick={() => categoryRailRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="hidden h-8 w-8 shrink-0 cursor-pointer rounded-[3px] border border-[#d4c5ad] text-rust hover:bg-sand md:block">→</button>
              </div>
              <div className="flex flex-wrap items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4">
                <label className="relative min-w-[150px] flex-1 lg:max-w-sm"><span className="sr-only">Search products</span><Search size={15} className="pointer-events-none absolute left-3 top-3 text-rust" /><input type="search" aria-label="Search products" placeholder="Search products…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="h-10 w-full rounded-[3px] border border-[#d4c5ad] bg-white/60 pl-9 pr-3 text-xs outline-none focus:border-rust focus:ring-1 focus:ring-rust" /></label>
                <div className="relative shrink-0"><SlidersHorizontal size={14} className="pointer-events-none absolute left-3 top-3.5 text-rust" /><select aria-label="Sort products" value={sortBy} onChange={e => setSortBy(e.target.value)} className="h-10 w-[130px] cursor-pointer rounded-[3px] border border-[#d4c5ad] bg-white/60 pl-9 pr-2 text-xs text-ink outline-none focus:border-rust sm:w-[190px]">
                  <option value="featured">Featured first</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name-az">Name: A–Z</option>
                </select></div>
                <div className="flex w-full items-center justify-between gap-4 text-[11px] text-[#77715f] lg:ml-auto lg:w-auto lg:gap-6">
                  <span aria-live="polite"><b className="text-ink">{filteredProducts.length}</b> product{filteredProducts.length === 1 ? '' : 's'}</span>
                  {(searchQuery || selectedCategory !== 'All Treasures' || sortBy !== 'featured') && <button onClick={() => { setSelectedCategory('All Treasures'); setSearchQuery(''); setSortBy('featured'); }} className="cursor-pointer text-rust underline underline-offset-4 hover:text-ink">Reset filters</button>}
                  <span className="text-[10px] md:hidden">Swipe categories ↔</span>
                </div>
              </div>
            </div>

            {/* Showcase Section Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <Eyebrow>BOUTIQUE SHOWCASE</Eyebrow>
                <h1 className="mt-4 font-serif text-[42px] leading-[1.05] tracking-[-.04em] sm:text-[54px]">
                  {selectedCategory === 'All Treasures' ? <>Curated <em className="font-normal text-rust">Treasures</em></> : selectedCategory}
                </h1>
              </div>
              <p className="max-w-md text-xs leading-[1.85] text-[#77715f]">
                Browse our current selection available at our Varkala store. Filter by category, search specific materials or reserve an object prior to your visit.
              </p>
            </div>

            {selectedCategory === 'Silver Jewellery' && <div className="mb-10"><p className="mb-4 text-xs uppercase tracking-widest text-rust">Explore Silver Jewellery</p><CategoryCards items={[silverBraceletCollection, silverNecklaceCollection, silverPendantCollection]} /></div>}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="group bg-paper border border-[#dcd1be] flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-rust/60"
                  >
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
                          onClick={() => handleOpenProductModal(product)}
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
                          onClick={() => handleOpenProductModal(product)}
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
                          {product.priceINR == null ? 'Price on request' : `₹${product.priceINR.toLocaleString('en-IN')}`}
                        </div>
                        <div className="text-[10px] text-[#8c826e]">
                          {product.priceINR != null && <>approx. {euroPrice(product.priceINR)} EUR</>}
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenProductModal(product)}
                        className="grid h-8 w-8 place-items-center bg-ink text-paper transition hover:bg-rust"
                        title="Inquire about object"
                      >
                        <ArrowUpRight size={16} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-paper border border-dashed border-[#cbb99a] p-8">
                <Sparkles size={32} className="mx-auto text-rust mb-3 opacity-80" />
                <h3 className="font-serif text-xl text-ink mb-1">{selectedCategory === 'Custom Jewellery' || selectedCategory === 'Jewellery Repairing' ? 'Let’s talk about your jewellery' : 'No products listed yet'}</h3>
                <p className="text-xs text-[#77715f] max-w-md mx-auto mb-5">
                  {selectedCategory === 'All Treasures' ? 'Try another search or clear the filters to browse our collection.' : 'Visit our Varkala store to explore this category and discuss availability or your requirements.'}
                </p>
                <button
                  onClick={() => { setSelectedCategory('All Treasures'); setSearchQuery(''); }}
                  className="inline-flex items-center gap-2 bg-ink text-paper text-xs px-4 py-2.5 uppercase tracking-wider hover:bg-rust transition"
                >
                  View All Products
                </button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <p aria-live="polite" className="text-[11px] text-[#77715f]">Showing {(safePage - 1) * productsPerPage + 1}–{Math.min(safePage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products</p>
                {totalPages > 1 && (
                    <nav aria-label="Product pages" className="flex flex-wrap items-center justify-center gap-2">
                      <button disabled={safePage === 1} onClick={() => goToProductPage(safePage - 1)} className="border border-[#cbb99a] px-3 py-2 text-xs transition hover:border-rust disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button key={page} aria-label={`Page ${page}`} aria-current={safePage === page ? 'page' : undefined} onClick={() => goToProductPage(page)} className={`h-9 min-w-9 border px-2 text-xs transition ${safePage === page ? 'border-ink bg-ink text-paper' : 'border-[#cbb99a] bg-paper hover:border-rust'}`}>{page}</button>
                      ))}
                      <button disabled={safePage === totalPages} onClick={() => goToProductPage(safePage + 1)} className="border border-[#cbb99a] px-3 py-2 text-xs transition hover:border-rust disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                    </nav>
                )}
              </div>
            )}

            {/* Bottom Store Reservation Note */}
            {/* <div className="mt-12 bg-sand border border-[#cfc3ac] p-4 text-center text-[10px] sm:text-xs text-[#6d6a5e] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <span className="flex items-center gap-1.5 text-rust font-semibold uppercase tracking-wider">
                <ShoppingBag size={14} /> Visiting Varkala?
              </span>
              <span>Reserve any object in advance. We hold items at our physical store for 48 hours.</span>
            </div> */}

          </div>
        </section>

        )}

        {!isProductsPage && <>
        <section id="story" className="grid bg-[#e6ddce] sm:grid-cols-2">
          <div className="relative min-h-[370px] sm:min-h-[520px]">
            <img src="/heritage-story.png" alt="Warm sunlight on carved wooden shelves displaying vintage jewellery, brass vessels and woven textiles" className="absolute h-full w-full object-cover object-center saturate-[.7]" />
            <div className="absolute bottom-[23px] left-[25px] bg-paper px-4 py-[13px] text-[8px] tracking-[.15em]">
              A WORLD OF STORIES <span className="pl-2.5 text-rust">✳</span>
            </div>
          </div>
          <div className="self-center px-[7%] py-[57px] sm:px-[9%] sm:py-[60px] lg:px-[12%] lg:py-[88px]">
            <Eyebrow>MORE THAN A SHOP</Eyebrow>
            <h2 className="mb-6 mt-5 font-serif text-[47px] leading-[1.06] tracking-[-.04em] sm:text-[clamp(42px,4vw,58px)]">
              For the ones who<br />
              love to <em className="font-normal text-rust">wander.</em>
            </h2>
            <p className="max-w-[400px] text-xs leading-[1.95] text-[#6f6b5e]">
              There is a special kind of joy in discovering something unexpected. A piece that speaks to you. A detail you can't stop looking at. A keepsake that brings a place back to life.
            </p>
            <p className="max-w-[400px] text-xs leading-[1.95] text-[#6f6b5e]">
              At Ladakh Heritage, every shelf invites you to slow down, look closer and follow your curiosity.
            </p>
            <Link to="/#visit" className="mt-[17px] inline-flex items-center gap-4 border-b border-[#b8a38a] pb-2 text-[11px] text-rust no-underline">
              Come discover your own treasure <ArrowRight size={17} />
            </Link>
            <div className="mt-[30px] font-serif text-xl italic text-[#746c57] sm:mt-[43px]">
              Ladakh Heritage <span className="font-sans text-[10px] not-italic text-[#89816e]">— Varkala</span>
            </div>
          </div>
        </section>

        <section id="visit" className="relative px-[7%] py-[75px] text-center sm:py-[105px]">
          <div className="absolute right-[8%] top-9 text-[35px] text-[#c4b291] sm:right-[15%] sm:top-[82px] sm:text-5xl">✳</div>
          <Eyebrow center>YOUR NEXT DISCOVERY</Eyebrow>
          <h2 className="mt-6 font-serif text-[47px] leading-[1.06] tracking-[-.04em] sm:text-[clamp(44px,4.5vw,62px)]">
            There's a treasure<br />
            with your name <em className="font-normal text-rust">on it.</em>
          </h2>
          <p className="mb-[38px] mt-[22px] text-xs text-[#77715f]">
            Make a little time to wander through. You never know what you'll find.
          </p>

          <div className="mx-auto flex max-w-[780px] flex-wrap items-center gap-4 border border-[#cfc3ac] bg-[#f8f4ec] p-5 text-left sm:gap-5 sm:p-[27px_30px]">
            <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border border-[#cbb99a] text-rust">
              <MapPin size={23} strokeWidth={1.4} />
            </div>
            <div className="min-w-[180px] flex-1">
              <span className="text-[8px] tracking-[.18em] text-[#8a7d63]">FIND US IN VARKALA</span>
              <h3 className="my-1.5 font-serif text-[22px] font-medium">Ladakh Heritage</h3>
              <p className="text-[11px] leading-[1.8] text-[#77715f]">
                Papanasam Beach Road, opposite Hotel Hindustan,<br className="hidden sm:block" /> Varkala, Kerala 695141, India
              </p>
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=Ladakh+Heritage+Papanasam+Beach+Road+Varkala" target="_blank" rel="noreferrer" className="ml-[67px] inline-flex items-center gap-3 bg-ink px-4 py-3.5 text-[10px] whitespace-nowrap text-paper no-underline transition hover:bg-rust sm:ml-0">
              Get directions <ArrowUpRight size={17} />
            </a>
          </div>

          <button onClick={() => setShowNote(!showNote)} className="mt-6 border-0 border-b border-[#b9ad98] bg-transparent px-0 py-2 text-[10px] text-[#746c57] focus:outline-none">
            Planning a visit? <span className="pl-3 text-[15px] text-rust">{showNote ? '−' : '+'}</span>
          </button>
          {showNote && (
            <p className="mx-auto mt-3 max-w-[460px] text-[11px] leading-[1.8] text-[#77715f]">
              Drop by while exploring Varkala and take your time browsing the collection. For current opening hours or a specific item, please check with the store before visiting.
            </p>
          )}
        </section>
        </>}
      </main>

      <footer className="grid grid-cols-2 items-center gap-5 bg-ink px-[7%] py-[27px] text-paper sm:grid-cols-3 sm:px-[7.2%]">
        <Link to="/" className="flex items-center gap-3 text-xs tracking-[.16em] text-paper no-underline">
          <img src="/ladakh-heritage-logo.png" alt="" width="40" height="40" className="h-10 w-10 shrink-0 object-contain" />
          LADAKH HERITAGE
        </Link>
        <span className="col-span-2 row-start-2 font-serif text-sm italic text-[#c5b9a3] sm:col-span-1 sm:row-auto sm:text-center">
          Objects with a soul. Stories that stay.
        </span>
        <Link to={isProductsPage ? '#products' : '#home'} className="justify-self-end text-[8px] tracking-[.15em] text-[#d4c7b0] no-underline">
          BACK TO TOP ↑
        </Link>
        <div className="col-span-2 flex flex-col items-center gap-4 border-t border-white/15 pt-6 sm:col-span-3 sm:flex-row sm:justify-between">
          <p className="text-[9px] uppercase tracking-[.18em] text-[#c5b9a3]">Stay connected</p>
          <ul aria-label="Social media and contact" className="flex flex-wrap justify-center gap-3 sm:gap-5">
            {contactLinks.map(({ label, icon: Icon, href }) => {
              const content = <><Icon size={18} aria-hidden="true" /><span className="text-[9px]">{label}</span></>;
              const styles = 'flex min-h-11 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm px-2 py-2 text-[#d4c7b0]';
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} aria-label={label} target={href.startsWith('tel:') ? undefined : '_blank'} rel={href.startsWith('tel:') ? undefined : 'noopener noreferrer'} className={`${styles} transition hover:text-[#e8ba83] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a66a]`}>
                      {content}
                    </a>
                  ) : (
                    <span aria-label={`${label} — coming soon`} aria-disabled="true" title={`${label} — coming soon`} className={styles}>
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
      {activeModalProduct && <ProductModal key={activeModalProduct.id} product={activeModalProduct} onClose={() => setActiveModalProduct(null)} />}
    </div>
  );
}
