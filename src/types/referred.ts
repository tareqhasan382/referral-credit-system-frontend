// Define the structure for a single referred user
export interface ReferredUser {
    name: string;
    email: string;
    credits: number;
    status: 'pending' | 'credited' | 'purchased'; // Example statuses
    createdAt: string; // ISO date string
}

// Define the structure for the main referral data object
export interface ReferralData {
    totalReferredUsers: number;
    referredUsersWhoPurchased: number;
    totalCreditsEarned: number;
    referredUsers: ReferredUser[];
}

// Define the overall structure of the store's state
export interface ReferralState {
    referralData: ReferralData | null;
    loading: boolean;
    error: string | null;

    // Action function signature
    getReferrals: (payload?: any) => Promise<void>;
}

// Define the expected successful API response structure
export interface ReferralApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ReferralData;
}