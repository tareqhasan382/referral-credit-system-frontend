"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import useCartStore from "@/store/useCartStore";
const dummyProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 130,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 2,
        name: "Smartwatch Pro",
        price: 199.99,
        rating: 4.6,
        image:
            "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 89.99,
        rating: 4.4,
        image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1331",
    },
    {
        id: 4,
        name: "Gaming Mouse RGB",
        price: 59.99,
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1627745214193-2bcefc681524?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=765",
    },
    {
        id: 5,
        name: "4K Action Camera",
        price: 249.99,
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1637838880859-4d57bbff0249?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1176",
    },
];

const Product = () => {
    const addToCart = useCartStore((state) => state.addToCart);
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Shop Products</h1>
                <p className="text-gray-500 mt-2">
                    Explore our latest products with great deals and premium quality.
                </p>
            </div>

            {/* Products Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {dummyProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col"
                    >
                        {/* Image */}
                        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                priority
                            />
                        </div>

                        {/* Product Info */}
                        <h3 className="text-lg font-semibold text-gray-800">
                            {product.name}
                        </h3>
                        <p className="text-indigo-600 font-bold mt-1">
                            ${product.price.toFixed(2)}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                                />
                            ))}
                            <span className="ml-1 text-gray-500 text-sm">
                {product.rating.toFixed(1)}
              </span>
                        </div>

                        {/* Button */}
                        <button className="mt-auto flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-3 rounded-lg hover:bg-indigo-700 transition"
                                onClick={() =>
                                    addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image,
                                    })
                                }
                        >
                            <ShoppingCart size={18}/>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
