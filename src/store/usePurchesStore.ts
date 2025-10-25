import { create } from "zustand";
import { apiFetch } from "@/lib/apiClient";

export interface PurchaseResponse {
    success: boolean;
    message?: string;
    data?: {
        referrerId?: string;
        referredUserId?: string;
    };
}

interface PurchaseState {
    loading: boolean;
    error: string | null;
    purchaseData: PurchaseResponse["data"] | null;
    purchaseOrder: () => Promise<PurchaseResponse["data"] | void>;
}

const usePurchaseStore = create<PurchaseState>((set) => ({
    loading: false,
    error: null,
    purchaseData: null,

    purchaseOrder: async () => {
        set({ loading: true, error: null });
        try {
            const response = await apiFetch<PurchaseResponse>("/api/v1/purchase/order", {
                method: "POST",
            });

            if (response.success) {
                set({ purchaseData: response.data });
                return response.data;
            } else {
                set({ error: response.message || "Failed to create purchase order" });
            }
        } catch (err: Error) {
            set({ error: err.message || "Purchase request failed" });
        } finally {
            set({ loading: false });
        }
    },
}));

export default usePurchaseStore;
