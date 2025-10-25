import { create } from "zustand";
import { apiFetch } from "@/lib/apiClient";
import { PurchasePayload } from "@/types/purchase";

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
    purchaseOrder: (payload: PurchasePayload) => Promise<PurchaseResponse["data"] | void>;
}

const usePurchaseStore = create<PurchaseState>((set) => ({
    loading: false,
    error: null,
    purchaseData: null,

    purchaseOrder: async (payload: PurchasePayload) => {
        set({ loading: true, error: null });
        try {
            const response = await apiFetch<PurchaseResponse>("/api/v1/purchase/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.success) {
                set({ purchaseData: response.data });
                return response.data;
            } else {
                set({ error: response.message || "Failed to create purchase order" });
            }
        } catch (err: any) {
            set({ error: err.message || "Purchase request failed" });
        } finally {
            set({ loading: false });
        }
    },
}));

export default usePurchaseStore;
