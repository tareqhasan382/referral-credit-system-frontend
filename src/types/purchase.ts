export interface PurchaseItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}
export interface PurchasePayload {
    userId: string;
    totalAmount: number;
    items: any;
}
