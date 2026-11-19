import { useEffect, useState } from 'react';
import { heroImages } from '../../config/media.js';

export default function HeroBackground() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const start = () => {
      clearInterval(timer);
      if (!paused && !preference.matches)
        timer = setInterval(() => setSlide((index) => (index + 1) % heroImages.length), 4000);
    };
    start();
    preference.addEventListener('change', start);
    return () => {
      clearInterval(timer);
      preference.removeEventListener('change', start);
    };
  }, [paused]);
  return (
    <>
      <div className="absolute inset-0" aria-hidden="true">
        {heroImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className={`absolute inset-0 h-full w-full object-cover object-[65%_center] transition-opacity duration-1000 motion-reduce:transition-none sm:object-center ${slide === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,240,231,0.96)_0%,rgba(245,240,231,0.88)_35%,rgba(245,240,231,0.12)_75%)] max-sm:bg-paper/80" />
      </div>
      <div className="absolute bottom-5 right-[7%] z-10 flex items-center gap-2 rounded-full bg-ink/80 px-3 py-2 text-paper">
        {heroImages.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Show background ${index + 1}`}
            aria-pressed={slide === index}
            onClick={() => setSlide(index)}
            className="grid h-8 w-8 cursor-pointer place-items-center"
          >
            <span
              className={`h-2 w-2 rounded-full ${slide === index ? 'bg-paper' : 'bg-paper/40'}`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          className="cursor-pointer px-2 py-2 text-[10px]"
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    </>
  );
}
