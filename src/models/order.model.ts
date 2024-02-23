export interface Order {
    orderId: number;
    orderedAt: string;
    address: string;
    recipient: string;
    contact: string;
    bookTitle: string;
    totalQuantity: number;
    totalPrice: number;
}