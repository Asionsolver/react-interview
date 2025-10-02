import React from "react";

// ProductCard.jsx
// Tailwind + React single-file component. Defaults to the product data you provided.

export default function ProductCard({ product }) {
  const avgRating =
    product.reviews && product.reviews.length
      ? (
          product.reviews.reduce((s, r) => s + r.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : "—";

  const discountedPrice = (
    product.price *
    (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  const savings = (product.price - discountedPrice).toFixed(2);

  return (
    <article
      className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-100"
      aria-label={product.title}
    >
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-56 object-cover"
        />

        {/* Stock / Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm`}
          >
            {product.brand}
          </span>

          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
              product.availabilityStatus === "In Stock"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
            aria-hidden
          >
            {product.availabilityStatus}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/80 hover:bg-white text-slate-700 shadow transition"
          aria-label="Add to wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682 4.318 12.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 leading-tight">
              {product.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">SKU: {product.sku}</p>
          </div>

          <div className="text-right">
            <div className="text-sm text-slate-500 line-through">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-lg font-bold">${discountedPrice}</div>
            <div className="text-xs text-rose-600">Save ${savings}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" aria-hidden>
            {renderStars(avgRating)}
            <span className="text-sm font-medium">{avgRating}</span>
          </div>

          <div className="text-xs text-slate-500">
            • {product.reviews.length} reviews
          </div>

          <div className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">
            MOQ {product.minimumOrderQuantity}
          </div>
        </div>

        <p className="text-sm text-slate-600">{product.description}</p>

        <div className="flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-slate-100 px-2 py-1 rounded-full font-medium"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:shadow-sm transition"
            aria-label="View details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Details
          </button>

          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:opacity-95 transition"
            aria-label="Add to cart"
            disabled={product.stock <= 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
            {product.stock > 0 ? "Add to cart" : "Out of stock"}
          </button>
        </div>

        {/* <div className="mt-3 text-xs text-slate-500 border-t pt-3 flex flex-col gap-1">
          <div>Shipping: {product.shippingInformation}</div>
          <div>Warranty: {product.warrantyInformation}</div>
          <div>
            Weight: {product.weight} g • Dimensions: {product.dimensions.width}×
            {product.dimensions.height}×{product.dimensions.depth} mm
          </div>
        </div> */}
      </div>
    </article>
  );
}

// Helper: render star icons based on rating
function renderStars(avgRating) {
  const full = Math.floor(Number(avgRating));
  const half = Number(avgRating) - full >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.644 9.393c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      );
    } else if (i === full && half) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.644 9.393c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 00.95-.69l1.286-3.966z"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-slate-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.644 9.393c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      );
    }
  }
  return <div className="flex items-center">{stars}</div>;
}
