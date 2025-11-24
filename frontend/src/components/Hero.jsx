import React, { useEffect, useMemo, useState } from 'react';

const fallBackSlides = [
  {
    name: 'Smartphone Max 20',
    price: 29999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900',
    description: 'Edge-to-edge display, pro camera system, and all-day battery life.',
  },
  {
    name: 'Laptop Ultra 15',
    price: 89999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900',
    description: 'Power through intensive workloads with the latest generation silicon.',
  },
  {
    name: 'Leather Jacket',
    price: 5999,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900',
    description: 'Premium handcrafted leather with timeless design cues.',
  },
];

const Hero = ({
  featuredProducts = [],
  onShopNow = () => {},
  onExploreCategories = () => {},
}) => {
  const slides = useMemo(() => {
    return (featuredProducts.length ? featuredProducts : fallBackSlides).map((product) => ({
      ...product,
      highlight: product.description || 'Trending pick crafted for modern lifestyles.',
    }));
  }, [featuredProducts]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const activeSlide = slides[currentSlide] || fallBackSlides[0];

  return (
    <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-white/80 mb-4">
              curated for you
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
              Discover the next product you’ll fall in love with.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {activeSlide.highlight}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onShopNow}
                className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition"
              >
                Shop Now
              </button>
              <button
                type="button"
                onClick={onExploreCategories}
                className="border border-white/50 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition"
              >
                Explore Categories
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden min-h-[500px] rounded-3xl shadow-2xl bg-white/10 dark:bg-gray-900/30 backdrop-blur-lg border border-white/20 dark:border-white/10"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              onTouchCancel={() => setIsPaused(false)}
            >
              {slides.map((slide, index) => (
                <div
                  key={slide.name + index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={index !== currentSlide}
                >
                  <div className="flex flex-col h-full">
                    <div className="relative h-72 md:h-80 flex-shrink-0">
                      <img
                        src={slide.image}
                        alt={slide.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x500?text=Product';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="flex-1 p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white flex flex-col">
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-300">
                            {slide.category}
                          </p>
                          <h3 className="text-2xl font-bold leading-snug">{slide.name}</h3>
                        </div>
                        <span className="text-xl font-extrabold text-blue-600 dark:text-blue-300 whitespace-nowrap">
                          ₹{slide.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {slide.highlight}
                      </p>
                      <div className="mt-auto pt-4 text-sm text-gray-400 dark:text-gray-500">
                        Featured #{index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* ensure first slide visible before absolute */}
              {!slides.length && (
                <div className="p-10 text-center text-white">Loading featured products...</div>
              )}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={`indicator-${index}`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white w-10' : 'bg-white/50 w-4'
                  }`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

