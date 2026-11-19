import { ArrowUpRight, MapPin } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow.jsx';
import { useState } from 'react';

export default function VisitSection() {
  const [showNote, setShowNote] = useState(false);
  return (
    <section id="visit" className="relative px-[7%] py-[75px] text-center sm:py-[105px]">
      <div className="absolute right-[8%] top-9 text-[35px] text-[#c4b291] sm:right-[15%] sm:top-[82px] sm:text-5xl">
        ✳
      </div>
      <Eyebrow center>YOUR NEXT DISCOVERY</Eyebrow>
      <h2 className="mt-6 font-serif text-[47px] leading-[1.06] tracking-[-.04em] sm:text-[clamp(44px,4.5vw,62px)]">
        There's a treasure
        <br />
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
            Papanasam Beach Road, opposite Hotel Hindustan,
            <br className="hidden sm:block" /> Varkala, Kerala 695141, India
          </p>
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Ladakh+Heritage+Papanasam+Beach+Road+Varkala"
          target="_blank"
          rel="noreferrer"
          className="ml-[67px] inline-flex items-center gap-3 bg-ink px-4 py-3.5 text-[10px] whitespace-nowrap text-paper no-underline transition hover:bg-rust sm:ml-0"
        >
          Get directions <ArrowUpRight size={17} />
        </a>
      </div>

      <button
        onClick={() => setShowNote(!showNote)}
        className="mt-6 border-0 border-b border-[#b9ad98] bg-transparent px-0 py-2 text-[10px] text-[#746c57] focus:outline-none"
      >
        Planning a visit? <span className="pl-3 text-[15px] text-rust">{showNote ? '−' : '+'}</span>
      </button>
      {showNote && (
        <p className="mx-auto mt-3 max-w-[460px] text-[11px] leading-[1.8] text-[#77715f]">
          Drop by while exploring Varkala and take your time browsing the collection. For current
          opening hours or a specific item, please check with the store before visiting.
        </p>
      )}
    </section>
  );
}
