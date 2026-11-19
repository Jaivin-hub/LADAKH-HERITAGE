import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow.jsx';

export default function StorySection() {
  return (
    <section id="story" className="grid bg-[#e6ddce] sm:grid-cols-2">
      <div className="relative min-h-[370px] sm:min-h-[520px]">
        <img
          src="/heritage-story.png"
          alt="Warm sunlight on carved wooden shelves displaying vintage jewellery, brass vessels and woven textiles"
          className="absolute h-full w-full object-cover object-center saturate-[.7]"
        />
        <div className="absolute bottom-[23px] left-[25px] bg-paper px-4 py-[13px] text-[8px] tracking-[.15em]">
          A WORLD OF STORIES <span className="pl-2.5 text-rust">✳</span>
        </div>
      </div>
      <div className="self-center px-[7%] py-[57px] sm:px-[9%] sm:py-[60px] lg:px-[12%] lg:py-[88px]">
        <Eyebrow>MORE THAN A SHOP</Eyebrow>
        <h2 className="mb-6 mt-5 font-serif text-[47px] leading-[1.06] tracking-[-.04em] sm:text-[clamp(42px,4vw,58px)]">
          For the ones who
          <br />
          love to <em className="font-normal text-rust">wander.</em>
        </h2>
        <p className="max-w-[400px] text-xs leading-[1.95] text-[#6f6b5e]">
          There is a special kind of joy in discovering something unexpected. A piece that speaks to
          you. A detail you can't stop looking at. A keepsake that brings a place back to life.
        </p>
        <p className="max-w-[400px] text-xs leading-[1.95] text-[#6f6b5e]">
          At Ladakh Heritage, every shelf invites you to slow down, look closer and follow your
          curiosity.
        </p>
        <Link
          to="/#visit"
          className="mt-[17px] inline-flex items-center gap-4 border-b border-[#b8a38a] pb-2 text-[11px] text-rust no-underline"
        >
          Come discover your own treasure <ArrowRight size={17} />
        </Link>
        <div className="mt-[30px] font-serif text-xl italic text-[#746c57] sm:mt-[43px]">
          Ladakh Heritage{' '}
          <span className="font-sans text-[10px] not-italic text-[#89816e]">— Varkala</span>
        </div>
      </div>
    </section>
  );
}
