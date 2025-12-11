import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const LatestProduct = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-product");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        Loading latest products...
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* ------ Section Header ------ */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Latest Products
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore our newest arrivals — carefully selected to meet the needs
            of modern garment production and product tracking.
          </p>
        </div>

        {/* ------ Product Grid ------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3 py-10">
              No latest products available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestProduct;
