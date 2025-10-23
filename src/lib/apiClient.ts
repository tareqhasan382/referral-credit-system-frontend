import useAuthStore from "@/store/useAuthStore";

export const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
};

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = useAuthStore.getState().token; // directly read from store (not reactive)
    const headers = new Headers(options.headers || {});

    // Add JSON headers
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    // Add Bearer token if logged in
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${getBaseUrl()}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `HTTP ${res.status}`);
    }

    // Automatically parse JSON if available
    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        return res.json() as Promise<T>;
    }

    return res as unknown as T;
}
