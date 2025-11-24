import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Header = ({
  isDarkMode = false,
  onToggleDarkMode = () => {},
  isMobile = false,
  onToggleMobileFilters = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const cancelTokenRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Cancel previous request if it exists
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('New search initiated');
    }

    // Clear suggestions if search term is too short
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      
      // Create cancel token for this request
      cancelTokenRef.current = axios.CancelToken.source();
      
      try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
          params: { q: searchTerm },
          cancelToken: cancelTokenRef.current.token,
        });
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          // Request was cancelled, ignore
          return;
        }
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Reduced debounce time for faster response
    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 150);

    return () => {
      clearTimeout(debounceTimer);
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('Component unmounted or search changed');
      }
    };
  }, [searchTerm]);

  const handleSuggestionClick = (productName) => {
    setSearchTerm(productName);
    setShowSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-sm transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-2xl font-bold text-blue-600 bg-white/90 dark:bg-gray-800/80 dark:text-white px-4 py-2 rounded-2xl shadow-md">
            Ecco
          </div>
          <div className="flex-1 max-w-xl md:max-w-2xl mx-4 flex items-center gap-3" ref={searchRef}>
            {isMobile && (
              <button
                type="button"
                onClick={onToggleMobileFilters}
                className="p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
                aria-label="Toggle filters"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M10 18h4" />
                </svg>
              </button>
            )}
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300/70 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {isLoading && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}

              {showSuggestions && (suggestions.length > 0 || isLoading) && (
                <div
                  ref={suggestionsRef}
                  className="absolute left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto max-w-full"
                >
                  {isLoading ? (
                    <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-300">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Searching...
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((product, index) => (
                      <div
                        key={product._id || index}
                        onClick={() => handleSuggestionClick(product.name)}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700/70 last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-gray-800 dark:text-gray-100">{product.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">₹{product.price.toLocaleString()}</div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-300">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-300 hover:border-blue-400 dark:hover:border-yellow-300 transition"
              aria-label="Toggle dark mode"
              type="button"
            >
              {isDarkMode ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-7.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
            <button className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

