import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Gem, MapPin, Menu, X, Search, SlidersHorizontal, Eye, ShoppingBag, Sparkles } from 'lucide-react';

const collections = [
  { number: '01', title: 'Handcrafted Jewellery', text: 'Distinctive pieces chosen for their character, detail and enduring beauty.', image: '/products/Silverturquoise.png', tall: true },
  { number: '02', title: 'Precious Stones', text: 'Colour, texture and natural wonder in every carefully selected stone.', image: '/products/CuratedMinerals.png' },
  { number: '03', title: 'Heritage Objects', text: 'Decorative treasures and meaningful keepsakes inspired by faraway places.', image: '/products/Heritagetreasures.png' },
];

const categoryTabs = [
  'All Treasures',
  'Handcrafted Jewellery',
  'Precious Stones',
  'Heritage Objects'
];

const productsData = [
  {
    id: 'lh-p1',
    title: 'Aged Brass Handbell',
    category: 'Heritage Objects',
    priceINR: 18500,
    priceUSD: 220,
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
    priceUSD: 170,
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
    priceUSD: 138,
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
    priceUSD: 105,
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
    priceUSD: 295,
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
    priceUSD: 190,
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
    priceUSD: 150,
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
    priceUSD: 385,
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
    priceUSD: 78,
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
    priceUSD: 162,
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
    priceUSD: 238,
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
    priceUSD: 110,
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
    priceUSD: 110,
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
    priceUSD: 110,
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
    priceUSD: 110,
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
    priceUSD: 110,
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
              <img src={product.image} alt={product.title} draggable="false" className="pointer-events-none h-full w-full select-none object-contain transition-transform duration-150 motion-reduce:transition-none" style={{ transform: `scale(${zoomed ? 2.5 : 1})`, transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }} />
            </button>
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
            <p className="mt-6 text-xl font-semibold">₹{product.priceINR.toLocaleString('en-IN')}</p>
            <p className="mt-1 text-xs text-[#8c826e]">approx. ${product.priceUSD} USD</p>
            <a href="#visit" onClick={onClose} className="mt-6 inline-flex items-center gap-3 bg-ink px-5 py-3 text-xs text-paper transition hover:bg-rust">Visit the store <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All Treasures');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const handleOpenProductModal = (product) => setActiveModalProduct(product);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);





  const filteredProducts = useMemo(() => {
    return productsData
      .filter((item) => {
        const matchesCategory = 
          selectedCategory === 'All Treasures' || item.category === selectedCategory;
        const matchesSearch = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceINR - b.priceINR;
        if (sortBy === 'price-high') return b.priceINR - a.priceINR;
        if (sortBy === 'name-az') return a.title.localeCompare(b.title);
        return 0; // featured default ordering
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const safePage = showAllProducts ? Math.min(currentPage, totalPages) : 1;
  const visibleProducts = filteredProducts.slice((safePage - 1) * productsPerPage, safePage * productsPerPage);
  const goToProductPage = (page) => {
    setCurrentPage(page);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="overflow-hidden bg-paper text-ink min-h-screen">
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
          <a href="#home" aria-label="Ladakh Heritage home" className="flex items-center gap-3 text-ink no-underline">
            <span className="grid h-[38px] w-[38px] place-items-center rounded-full border border-[#a28a61] text-rust sm:h-[42px] sm:w-[42px]">
              <Gem size={22} strokeWidth={1.35} />
            </span>
            <span className="flex flex-col gap-1">
              <strong className="text-[10px] tracking-[.16em] sm:text-xs">LADAKH HERITAGE</strong>
              <small className="text-[7px] tracking-[.25em] text-[#77715e] sm:text-[8px]">OBJECTS WITH A SOUL</small>
            </span>
          </a>

          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-[110px] flex-col border-b border-ink/20 bg-paper/98 px-[6%] pb-6 shadow-md backdrop-blur-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-9 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}>
            <a onClick={closeMenu} href="#collections" className="border-b border-[#ddd3c2] py-3.5 text-xs text-ink no-underline sm:border-0 sm:py-0">Explore</a>
            <a onClick={closeMenu} href="#story" className="border-b border-[#ddd3c2] py-3.5 text-xs text-ink no-underline sm:border-0 sm:py-0">Our world</a>
            <a onClick={closeMenu} href="#visit" className="border-b border-[#ddd3c2] py-3.5 text-xs text-ink no-underline sm:border-0 sm:py-0">Find us</a>
            <a onClick={closeMenu} href="#visit" className="mt-3 flex items-center justify-center gap-2.5 border border-ink px-4 py-3 text-xs text-ink no-underline transition hover:bg-ink hover:text-paper sm:mt-0">
              Visit the store <ArrowUpRight size={15} />
            </a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" className="border-0 bg-transparent text-ink focus:outline-none sm:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      </div>

      {/* Main Container padding accounts for Banner (34px) + Header (76px / 84px) */}
      <main className="pt-[110px] sm:pt-[118px]">
        <section id="home" className="relative grid items-center gap-10 px-[7%] py-[52px] sm:min-h-[610px] sm:grid-cols-[.95fr_1fr] sm:gap-[4%] sm:px-[7%] sm:py-[66px] lg:grid-cols-2 lg:gap-[5%] lg:px-[11%]">
          <div className="max-w-[490px] pb-2">
            <Eyebrow>A DISCOVERY IN VARKALA</Eyebrow>
            <h1 className="my-6 font-serif text-[clamp(60px,17vw,78px)] leading-[.99] tracking-[-.045em] sm:my-7 sm:text-[62px] lg:text-[clamp(56px,6vw,88px)]">
              Not just found.<br />
              <em className="font-normal text-rust">Felt.</em>
            </h1>
            <p className="max-w-[380px] text-[13px] leading-[1.85] text-[#6d6a5e] sm:text-sm">
              A thoughtfully gathered collection of jewellery, precious stones and heritage treasures — each with a story waiting to become yours.
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <a href="#collections" className="inline-flex items-center gap-5 bg-ink px-5 py-4 text-[11px] text-paper no-underline transition hover:bg-rust">
                Explore our treasures <ArrowRight size={17} />
              </a>
              <a href="#story" className="inline-flex items-center gap-2 border-b border-[#b8b09e] pb-1.5 text-[10px] text-ink no-underline hover:text-rust">
                The story behind the store <ArrowDownRight size={17} />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[10px] leading-[1.7] text-[#77715e] sm:mt-[57px]">
              <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-[#b6a27e] font-serif text-xs text-rust">LH</span>
              <span>
                Curiosities from near and far<br />
                <b className="font-medium text-ink">Found on Papanasam Beach Road</b>
              </span>
            </div>
          </div>

          <div className="relative px-2.5 pb-3 sm:mt-0">
            <div className="relative h-[390px] bg-[#ddd0ba] sm:h-[420px] lg:h-[470px]">
              <img src="/shop-interior.webp" alt="Inside Ladakh Heritage, with handcrafted necklaces displayed across the shop" className="relative z-[1] h-full w-full object-cover saturate-[.8]" />
              <div className="pointer-events-none absolute inset-[10px_-10px_-10px_10px] border border-[#b9a787]" />
              <div className="absolute inset-x-0 bottom-0 z-[2] flex justify-between bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-8 text-[8px] tracking-[.17em] text-white">
                <span>INSIDE THE STORE</span>
                <span>VARKALA, KERALA</span>
              </div>
            </div>
            <div className="absolute -left-3 bottom-7 z-[3] flex h-[108px] w-[108px] -rotate-6 flex-col items-center justify-center gap-1 rounded-full bg-[#e9dfce] text-center font-serif text-sm leading-tight shadow-lg sm:-left-11 sm:bottom-11 sm:h-[133px] sm:w-[133px] sm:text-base">
              <span className="text-lg text-rust">✳</span>
              <span>Made to be<br /><i className="text-rust">discovered.</i></span>
            </div>
            <div className="absolute -right-2 top-10 hidden [writing-mode:vertical-rl] text-[8px] tracking-[.22em] text-[#79745f] sm:block">
              A CABINET OF CURIOSITIES · EST. VARKALA
            </div>
          </div>
          {/* <div className="absolute bottom-5 right-[7%] flex items-center gap-3 text-[9px] text-[#827a66] sm:bottom-8 sm:left-[5%] sm:right-auto">
            <span>01</span>
            <span className="h-px w-[38px] bg-[#a99c82]" />
            <span>03</span>
          </div> */}
        </section>

        <div className="overflow-hidden border-y border-[#c9bda6] bg-sand">
          <div className="flex min-w-max items-center justify-around gap-6 py-[17px] text-[8px] tracking-[.2em] text-[#5e5b48] sm:gap-[38px] sm:text-[9px]">
            <span>TIMELESS OBJECTS</span>
            <b className="text-sm font-normal text-rust">✳</b>
            <span>HANDPICKED FINDS</span>
            <b className="text-sm font-normal text-rust">✳</b>
            <span>ROOTED IN CULTURE</span>
            <b className="text-sm font-normal text-rust">✳</b>
            <span>MADE FOR YOUR STORY</span>
            <b className="text-sm font-normal text-rust">✳</b>
            <span>TIMELESS OBJECTS</span>
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

          <div className="grid grid-cols-1 items-start gap-7 sm:grid-cols-3 sm:gap-5">
            {collections.map((item, i) => (
              <article key={item.number} className={`${i === 1 ? 'sm:mt-[52px]' : ''} ${i === 2 ? 'sm:mt-[104px]' : ''}`}>
                <div className={`group relative h-[300px] overflow-hidden bg-[#ded4c1] sm:h-[280px] ${item.tall ? 'sm:h-[380px]' : ''} ${i === 1 ? 'sm:h-[340px]' : ''}`}>
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover saturate-[.75] transition duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute left-3.5 top-3.5 z-[1] text-[10px] tracking-widest text-white">{item.number}</span>
                  <span className="absolute bottom-3 right-3 grid h-[35px] w-[35px] place-items-center bg-paper text-ink">
                    <ArrowUpRight size={20} />
                  </span>
                  <a href="#products" onClick={() => setSelectedCategory(item.title)} className="absolute bottom-3 right-3 grid h-[35px] w-[35px] place-items-center bg-paper text-ink transition hover:bg-rust hover:text-white">
                    <ArrowUpRight size={20} />
                  </a>
                </div>
                <div className="border-b border-ink/20 py-[18px]">
                  <h3 className="mb-2 font-serif text-[22px] font-medium sm:text-[21px]">{item.title}</h3>
                  <p className="max-w-[270px] text-[11px] leading-[1.8] text-[#77715f]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[8px] leading-relaxed tracking-[.13em] text-[#77715f] sm:gap-6 sm:tracking-[.16em]">
            <span>THE JOY IS IN THE FINDING</span>
            <span className="text-[17px] text-rust">✳</span>
            <span>COME WITH CURIOSITY. LEAVE WITH A STORY.</span>
          </div>
        </section>

        {/* NEW HIGHLY-UPDATED PRODUCTS CATALOGUE SHOWCASE */}
        <section id="products" className="scroll-mt-[118px] bg-[#f2ebdf] border-t border-[#c9bda6] px-[5%] py-[70px] sm:px-[7%] sm:py-20 lg:px-[9%] lg:py-[100px]">
          <div className="max-w-7xl mx-auto">
            {/* Showcase Section Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <Eyebrow>BOUTIQUE SHOWCASE</Eyebrow>
                <h2 className="mt-4 font-serif text-[42px] leading-[1.05] tracking-[-.04em] sm:text-[54px]">
                  Curated Treasures <br />
                  <em className="font-normal text-rust">& Authentic Keepsakes</em>
                </h2>
              </div>
              <p className="max-w-md text-xs leading-[1.85] text-[#77715f]">
                Browse our current selection available at our Varkala store. Filter by category, search specific materials or reserve an object prior to your visit.
              </p>
            </div>

            {/* Filter, Search & Sort Bar */}
            <div className="bg-paper p-4 sm:p-6 border border-[#cfc3ac] shadow-xs mb-10">
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                  {categoryTabs.map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 text-[10px] sm:text-[11px] tracking-[.12em] whitespace-nowrap uppercase font-medium transition-all border ${
                          active
                            ? 'bg-ink text-paper border-ink shadow-xs'
                            : 'bg-transparent text-[#6d6a5e] border-[#dcd1be] hover:border-rust hover:text-ink'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Search & Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  {/* Search Input */}
                  <div className="relative min-w-[210px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c826e]" />
                    <input
                      type="text"
                      placeholder="Search turquoise, silver, bowl..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#f9f6f0] border border-[#dcd1be] pl-8 pr-7 py-2 text-xs text-ink placeholder-[#a29986] focus:outline-none focus:border-rust transition"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')} 
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#8c826e] hover:text-ink"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative flex items-center">
                    <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c826e] pointer-events-none" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full sm:w-auto appearance-none bg-[#f9f6f0] border border-[#dcd1be] pl-8 pr-7 py-2 text-xs text-ink focus:outline-none focus:border-rust cursor-pointer"
                    >
                      <option value="featured">Featured First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-az">Name: A-Z</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Active Filter Summary */}
              {(searchQuery || selectedCategory !== 'All Treasures') && (
                <div className="mt-4 pt-3 border-t border-[#e8dfcf] flex justify-between items-center text-[11px] text-[#77715f]">
                  <span>
                    Showing <b>{filteredProducts.length}</b> object{filteredProducts.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'All Treasures' && <span> under <i>"{selectedCategory}"</i></span>}
                    {searchQuery && <span> matching <i>"{searchQuery}"</i></span>}
                  </span>
                  <button 
                    onClick={() => { setSelectedCategory('All Treasures'); setSearchQuery(''); }}
                    className="text-rust underline hover:text-ink"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

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
                          className="w-full h-full object-cover saturate-[.8] transition-transform duration-500 group-hover:scale-105"
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
                          ₹{product.priceINR.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-[#8c826e]">
                          approx. ${product.priceUSD} USD
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
                <h3 className="font-serif text-xl text-ink mb-1">No treasures match your search</h3>
                <p className="text-xs text-[#77715f] max-w-md mx-auto mb-5">
                  We frequently receive one-of-a-kind artifacts. Try broadening your keywords or check with our store host on Papanasam Beach Road.
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
                {!showAllProducts && filteredProducts.length > productsPerPage && (
                  <button onClick={() => { setShowAllProducts(true); goToProductPage(2); }} className="inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3 text-xs text-paper transition hover:bg-rust">View all products <ArrowRight size={16} /></button>
                )}
                {showAllProducts && (
                  <>
                    <nav aria-label="Product pages" className="flex flex-wrap items-center justify-center gap-2">
                      <button disabled={safePage === 1} onClick={() => goToProductPage(safePage - 1)} className="border border-[#cbb99a] px-3 py-2 text-xs transition hover:border-rust disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button key={page} aria-label={`Page ${page}`} aria-current={safePage === page ? 'page' : undefined} onClick={() => goToProductPage(page)} className={`h-9 min-w-9 border px-2 text-xs transition ${safePage === page ? 'border-ink bg-ink text-paper' : 'border-[#cbb99a] bg-paper hover:border-rust'}`}>{page}</button>
                      ))}
                      <button disabled={safePage === totalPages} onClick={() => goToProductPage(safePage + 1)} className="border border-[#cbb99a] px-3 py-2 text-xs transition hover:border-rust disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                    </nav>
                    <button onClick={() => { setShowAllProducts(false); goToProductPage(1); }} className="text-[11px] text-rust underline">Back to featured products</button>
                  </>
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

        <section id="story" className="grid bg-[#e6ddce] sm:grid-cols-2">
          <div className="relative min-h-[370px] sm:min-h-[520px]">
            <img src="/artifacts.webp" alt="A warmly lit display of sculptural heritage objects and curios" className="absolute h-full w-full object-cover object-center saturate-[.7]" />
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
            <a href="#visit" className="mt-[17px] inline-flex items-center gap-4 border-b border-[#b8a38a] pb-2 text-[11px] text-rust no-underline">
              Come discover your own treasure <ArrowRight size={17} />
            </a>
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
      </main>

      <footer className="grid grid-cols-2 items-center gap-5 bg-ink px-[7%] py-[27px] text-paper sm:grid-cols-3 sm:px-[7.2%]">
        <a href="#home" className="text-xs tracking-[.16em] text-paper no-underline">
          LADAKH HERITAGE <span className="pl-1 text-[#c6a66a]">✳</span>
        </a>
        <span className="col-span-2 row-start-2 font-serif text-sm italic text-[#c5b9a3] sm:col-span-1 sm:row-auto sm:text-center">
          Objects with a soul. Stories that stay.
        </span>
        <a href="#home" className="justify-self-end text-[8px] tracking-[.15em] text-[#d4c7b0] no-underline">
          BACK TO TOP ↑
        </a>
        <div className="col-span-2 mt-2 flex justify-between gap-4 border-t border-white/15 pt-4 text-[7px] tracking-[.13em] text-[#a8a08f] sm:col-span-3 sm:text-[8px]">
          <span>© {new Date().getFullYear()} LADAKH HERITAGE</span>
          <span className="text-right">MADE WITH CURIOSITY IN VARKALA</span>
        </div>
      </footer>
      {activeModalProduct && <ProductModal product={activeModalProduct} onClose={() => setActiveModalProduct(null)} />}
    </div>
  );
}