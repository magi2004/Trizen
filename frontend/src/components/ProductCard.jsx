import React from 'react';

const Star = ({ fill = 0 }) => {
  const clampedFill = Math.max(0, Math.min(fill, 100));

  return (
    <span className="relative inline-flex w-5 h-5 mr-0.5">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-300">
        <path
          fill="currentColor"
          d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.787 1.402 8.176L12 18.896l-7.339 3.858 1.402-8.176L.125 9.211l8.207-1.193z"
        />
      </svg>
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${clampedFill}%` }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.75)]">
          <path
            fill="currentColor"
            d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.787 1.402 8.176L12 18.896l-7.339 3.858 1.402-8.176L.125 9.211l8.207-1.193z"
          />
        </svg>
      </span>
    </span>
  );
};

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const value = rating - index;
      const fill = Math.min(Math.max(value, 0), 1) * 100;
      return <Star key={index} fill={fill} />;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700">
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white py-2 rounded-lg transition duration-300 font-semibold shadow-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

