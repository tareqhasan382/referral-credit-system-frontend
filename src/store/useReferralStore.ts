import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { apiFetch } from "@/lib/apiClient";
import { ReferralState, ReferralApiResponse } from "@/types/referred";
// interface ReferralState {
//     referralsData: {
//         totalReferredUsers: number;
//         referredUsersWhoPurchased: number;
//         totalCreditsEarned: number;
//     } | null;
//     getReferrals: () => Promise<typeof referralsData>;
// }
const useReferralStore = create<ReferralState>()(
    devtools(
        persist(
            (set) => ({
                referralData: null,
                loading: false,
                error: null,
                getReferrals: async () => {
                    set({ loading: true, error: null });
                    try {
                        const response = await apiFetch<ReferralApiResponse>("/api/v1/referral/get-referrals", {
                            method: "GET",
                        });
                        if (response.success) {
                            set({ referralData: response.data });
                            return response.data; // <--- return the data
                        } else {
                            set({ error: response.message || "Failed to retrieve referrals" });
                            return null;
                        }
                    } catch (err: any) {
                        set({ error: err.message || "Referral retrieval failed" });
                        return null;
                    } finally {
                        set({ loading: false });
                    }
                }
            }),
            {
                name: "referral", // key in localStorage
                partialize: (state) => ({ referralData: state.referralData }),
            }
        )
    )
);

export default useReferralStore;