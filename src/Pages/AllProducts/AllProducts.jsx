import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard/ProductCard";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });
  console.log(products);
  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500 text-lg">
        Loading products...
      </div>
    );
  }

  // ---------- FILTER + SORT ----------
  let filteredProducts = [...products];

  // Search
  if (search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.productName?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Category Filter
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  // SORT
  if (sortBy === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "latest") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* ---------- Page Title ---------- */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          All Products
        </h2>

        {/* ---------- Filter Row ---------- */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered w-full md:w-1/4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full md:w-1/4"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="latest">Latest Added</option>
          </select>
        </div>

        {/* ---------- Product Grid ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500 py-10">
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
