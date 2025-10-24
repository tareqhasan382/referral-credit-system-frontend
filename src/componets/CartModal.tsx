"use client";
import React from "react";
import { X } from "lucide-react";
import useCartStore from "@/store/useCartStore";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCartStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto transform transition-all overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b">
                    <h3 className="text-xl font-bold text-gray-900">Your Cart</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={22} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-4 flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <p className="text-gray-500 text-center mt-6">Your cart is empty 🛒</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 mb-4 border-b pb-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-700">Total:</p>
                            <p className="text-lg font-bold text-indigo-600">${totalPrice.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={clearCart}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
