import Eyebrow from '../ui/Eyebrow.jsx';
import CategoryCards from '../collections/CategoryCards.jsx';

export default function CollectionsSection() {
  return (
    <section
      id="collections"
      className="px-[7%] py-[70px] sm:px-[7%] sm:py-20 lg:px-[10.5%] lg:py-[104px]"
    >
      <div className="mb-7 sm:mb-[43px] sm:flex sm:items-end sm:justify-between sm:gap-10">
        <div>
          <Eyebrow>THE COLLECTION</Eyebrow>
          <h2 className="mt-5 font-serif text-[47px] leading-[1.06] tracking-[-.04em] sm:text-[clamp(44px,4.5vw,62px)]">
            Little wonders.
            <br />
            <em className="font-normal text-rust">Lasting meaning.</em>
          </h2>
        </div>
        <p className="mt-5 max-w-[300px] text-xs leading-[1.9] text-[#77715f] sm:mb-1.5 sm:mt-0">
          Some things catch your eye. Others stay with you long after you leave. Explore a few
          corners of our world.
        </p>
      </div>

      <CategoryCards />

      <div className="mt-11 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[8px] leading-relaxed tracking-[.13em] text-[#77715f] sm:gap-6 sm:tracking-[.16em]">
        <span>THE JOY IS IN THE FINDING</span>
        <span className="text-[17px] text-rust">✳</span>
        <span>COME WITH CURIOSITY. LEAVE WITH A STORY.</span>
      </div>
    </section>
  );
}
