import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

interface BannerHeroProps {
  onShopNow: () => void;
  onExploreDeals: () => void;
}

export const BannerHero: React.FC<BannerHeroProps> = ({ onShopNow, onExploreDeals }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 shadow-xl border border-slate-800 my-4">
      {/* Background Image & Overlay */}
      <div className="relative h-[380px] sm:h-[440px] md:h-[480px] w-full overflow-hidden">
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center items-start text-white">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 backdrop-blur-md px-3 py-1 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            {slide.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 max-w-2xl leading-tight">
            {slide.title}
          </h1>

          <p className="text-lg sm:text-2xl font-medium text-slate-200 mb-2">
            {slide.subtitle}
          </p>

          <p className="text-sm sm:text-base text-amber-400 font-semibold mb-8">
            {slide.discountText}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onShopNow}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base cursor-pointer active:scale-95"
            >
              {slide.ctaText}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDeals}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 text-sm sm:text-base cursor-pointer active:scale-95"
            >
              {slide.secondaryCtaText}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Prev/Next Controls */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm transition-all border border-white/10"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm transition-all border border-white/10"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
