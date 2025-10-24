import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addToCart: (product: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
};

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            totalItems: 0,
            totalPrice: 0,

            addToCart: (product) => {
                const existing = get().items.find((item) => item.id === product.id);

                let newItems;
                if (existing) {
                    newItems = get().items.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    newItems = [...get().items, { ...product, quantity: 1 }];
                }

                set({
                    items: newItems,
                    totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
                    totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
                });
            },

            removeFromCart: (id) => {
                const newItems = get().items.filter((item) => item.id !== id);
                set({
                    items: newItems,
                    totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
                    totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
                });
            },

            updateQuantity: (id, quantity) => {
                let newItems;
                if (quantity <= 0) {
                    newItems = get().items.filter((item) => item.id !== id);
                } else {
                    newItems = get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    );
                }

                set({
                    items: newItems,
                    totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
                    totalPrice: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
                });
            },

            clearCart: () => {
                set({ items: [], totalItems: 0, totalPrice: 0 });
            },
        }),
        {
            name: "cart-storage",
        }
    )
);

export default useCartStore;
