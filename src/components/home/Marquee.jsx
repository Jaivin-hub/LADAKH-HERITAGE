import React from 'react';

export default function Marquee() {
  return (
    <div className="heritage-marquee overflow-hidden border-y border-[#c9bda6] bg-sand">
      <div className="heritage-marquee-track flex w-max py-[17px] text-[8px] tracking-[.2em] text-[#5e5b48] sm:text-[9px]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex min-w-[100vw] shrink-0 items-center justify-around gap-6 pr-6 sm:gap-[38px] sm:pr-[38px]"
          >
            {[
              'TIMELESS OBJECTS',
              'HANDPICKED FINDS',
              'ROOTED IN CULTURE',
              'MADE FOR YOUR STORY',
            ].map((label) => (
              <React.Fragment key={label}>
                <span className="whitespace-nowrap">{label}</span>
                <span aria-hidden="true" className="text-sm text-rust">
                  ✳
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
