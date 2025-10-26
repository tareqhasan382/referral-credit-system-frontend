import useAuthStore from "@/store/useAuthStore";

export const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "https://referral-credit-system-nu.vercel.app" //"http://localhost:5000";
};

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = useAuthStore.getState().token;
    const headers = new Headers(options.headers || {});
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `${token}`);
    }

    const res = await fetch(`${getBaseUrl()}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const text = await res.text();
        try {
            const json = JSON.parse(text);
            throw new Error(json.message || `HTTP ${res.status}`);
        } catch {
            throw new Error(text || `HTTP ${res.status}`);
        }
    }

    const contentType = res.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
        return res.json() as Promise<T>;
    }

    return res as unknown as T;
}
