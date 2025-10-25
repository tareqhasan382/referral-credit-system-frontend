
export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    referralCode?: string;

}
export interface LoginPayload {
    email: string;
    password: string;

}

