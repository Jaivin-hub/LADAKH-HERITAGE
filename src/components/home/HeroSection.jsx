import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDownRight } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow.jsx';
import HeroBackground from './HeroBackground.jsx';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[620px] items-center overflow-hidden px-[7%] py-20 sm:min-h-[660px] lg:px-[11%]"
    >
      <HeroBackground />
      <div className="relative z-10 max-w-[490px] pb-8">
        <Eyebrow>A DISCOVERY IN VARKALA</Eyebrow>
        <h1 className="my-6 font-serif text-[clamp(60px,17vw,78px)] leading-[.99] tracking-[-.045em] sm:my-7 sm:text-[62px] lg:text-[clamp(56px,6vw,88px)]">
          Not just found.
          <br />
          <em className="font-normal text-rust">Felt.</em>
        </h1>
        <p className="max-w-[380px] text-[13px] leading-[1.85] text-[#6d6a5e] sm:text-sm">
          A thoughtfully gathered collection of jewellery, precious stones and heritage treasures —
          each with a story waiting to become yours.
        </p>
        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-5 bg-ink px-5 py-4 text-[11px] text-paper no-underline transition hover:bg-rust"
          >
            Explore our treasures <ArrowRight size={17} />
          </Link>
          <Link
            to="/#story"
            className="inline-flex items-center gap-2 border-b border-[#b8b09e] pb-1.5 text-[10px] text-ink no-underline hover:text-rust"
          >
            The story behind the store <ArrowDownRight size={17} />
          </Link>
        </div>
        <div className="mt-8 flex items-center gap-3 text-[10px] leading-[1.7] text-[#77715e] sm:mt-[57px]">
          <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-[#b6a27e] font-serif text-xs text-rust">
            LH
          </span>
          <span>
            Curiosities from near and far
            <br />
            <b className="font-medium text-ink">Found on Papanasam Beach Road</b>
          </span>
        </div>
      </div>
    </section>
  );
}
