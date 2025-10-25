"use client";
import React, {useEffect, useState} from "react";
import { X } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import usePurchaseStore from "@/store/usePurchesStore";
import useAuthStore from "@/store/useAuthStore";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCartStore();
    const purchaseOrder = usePurchaseStore(state => state.purchaseOrder); // properly typed
    const user = useAuthStore(state => state.user);

    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isOpen) return null;
    if (!isHydrated) return <div>Loading...</div>;

    const handleConfirm = async () => {
        if (items.length === 0 || !user?._id) return;

        setLoading(true);
        setMessage(null);

        const payload: PurchasePayload = {
            userId: user._id,
            totalAmount: totalPrice,
            items,
        };

        try {
            await purchaseOrder(payload);
            setMessage(" Order confirmed successfully!");
            clearCart();
        } catch (err: any) {
            console.error(err);
            setMessage(" Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };
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
                <div className={" mb-4 px-4 w-full bg-amber-200"}>
                    <button
                        onClick={clearCart}
                        className=" w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                    >
                        Clear Cart
                    </button>
                </div>
                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-700">Total:</p>
                            <p className="text-lg font-bold text-indigo-600">${totalPrice.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition ${
                                loading
                                    ? "bg-indigo-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                        >
                            {loading ? "Confirming..." : "Confirm"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
