import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsGrid from './components/ProductsGrid';
import Filters from './components/Filters';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const getIsMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [isFilterOpen, setIsFilterOpen] = useState(() => !getIsMobile());
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('trizen-theme') === 'dark';
  });
  const filtersCardRef = useRef(null);
  const productsSectionRef = useRef(null);
  const categorySelectRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('trizen-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('trizen-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsFilterOpen(!isMobile);
  }, [isMobile]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = useMemo(() => products.slice(0, 5), [products]);

  const scrollToElement = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShopNow = () => {
    scrollToElement(productsSectionRef);
  };

  const handleExploreCategories = () => {
    if (isMobile) {
      setIsFilterOpen(true);
      setTimeout(() => {
        categorySelectRef.current?.focus();
      }, 300);
    } else {
      scrollToElement(filtersCardRef);
      setTimeout(() => {
        categorySelectRef.current?.focus({ preventScroll: true });
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        onToggleMobileFilters={() => setIsFilterOpen((prev) => !prev)}
      />
      <Hero
        featuredProducts={featuredProducts}
        onShopNow={handleShopNow}
        onExploreCategories={handleExploreCategories}
      />
      <div ref={productsSectionRef} className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {!isMobile && (
            <aside className="lg:w-72 flex-shrink-0">
              <Filters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                products={products}
                visibleCount={filteredProducts.length}
                containerRef={filtersCardRef}
                selectRef={categorySelectRef}
                className="sticky top-28"
              />
            </aside>
          )}
          <section className="flex-1">
            <ProductsGrid products={filteredProducts} loading={loading} />
          </section>
        </div>
      </div>
      {isMobile && (
        <>
          <div
            className={`fixed top-20 bottom-0 left-0 z-40 w-72 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ${
              isFilterOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <span className="font-semibold text-gray-800 dark:text-gray-100">Filters</span>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <Filters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  products={products}
                  visibleCount={filteredProducts.length}
                  selectRef={categorySelectRef}
                  className="shadow-none border-none p-0"
                />
              </div>
            </div>
          </div>
          <div
            className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ${
              isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsFilterOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;

