import React from 'react';

const Filters = ({ selectedCategory, onCategoryChange, products }) => {
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-gray-700 font-semibold">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="ml-auto text-sm text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default Filters;

