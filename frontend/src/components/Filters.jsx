import React from 'react';

const Filters = ({
  selectedCategory,
  onCategoryChange,
  products,
  containerRef,
  selectRef,
  className = '',
  visibleCount,
}) => {
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const count = typeof visibleCount === 'number' ? visibleCount : products.length;

  return (
    <div
      ref={containerRef}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors ${className}`}
    >
      <div className="flex flex-col gap-4">
        <label className="text-gray-700 dark:text-gray-200 font-semibold">Category</label>
        <select
          ref={selectRef}
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 dark:text-gray-100"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing {count} product{count !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default Filters;

