import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import {apiFetch} from "@/lib/apiClient";

type User = {
    _id: string;
    name: string;
    email: string;
    referralCode?: string;
};

type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    registerUser: (payload: RegisterPayload) => Promise<void>;
    loginUser: (payload: LoginPayload) => Promise<void>;
    logoutUser: () => void;
};

const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                token: null,
                loading: false,
                error: null,

                registerUser: async (payload) => {
                    set({ loading: true, error: null });
                    try {
                        const response = await apiFetch<{
                            success: boolean;
                            message: string;
                            data: { user: User; token: string };
                        }>("/api/v1/auth/register", {
                            method: "POST",
                            body: JSON.stringify(payload),
                        });

                        set({
                            user: response?.data?.user || null,
                            token: response?.data?.accessToken || null,
                        });
                    } catch (err: any) {
                        set({ error: err.message || "Registration failed" });
                    } finally {
                        set({ loading: false });
                    }
                },
                loginUser: async (payload) => {
                    set({ loading: true, error: null });
                    try {
                        const data = await apiFetch<{ data: { user: User; token: string } }>(
                            "/api/v1/auth/login",
                            {
                                method: "POST",
                                body: JSON.stringify(payload),
                            }
                        );
                        set({ user: data?.data?.user, token: data?.data?.accessToken });
                    } catch (err: any) {
                        set({ error: err.message });
                    } finally {
                        set({ loading: false });
                    }
                },
                logoutUser: () => {
                    set({ user: null, token: null });
                },
            }),
            {
                name: "auth-storage", // key in localStorage
                partialize: (state) => ({ user: state.user, token: state.token }), // only persist these
            }
        )
    )
);

export default useAuthStore;
