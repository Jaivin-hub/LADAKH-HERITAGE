import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/home/HeroSection.jsx';
import Marquee from '../components/home/Marquee.jsx';
import CollectionsSection from '../components/home/CollectionsSection.jsx';
import StorySection from '../components/home/StorySection.jsx';
import VisitSection from '../components/home/VisitSection.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <CollectionsSection />
      <div className="bg-paper px-[7%] pb-16 text-center">
        <Link
          to="/products?category=All%20Treasures"
          className="inline-flex items-center gap-3 bg-ink px-6 py-4 text-xs text-paper transition hover:bg-rust"
        >
          View all products <ArrowRight size={16} />
        </Link>
      </div>
      <StorySection />
      <VisitSection />
    </>
  );
}
