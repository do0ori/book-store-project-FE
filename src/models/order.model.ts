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

export interface OrderSheet {
    items: number[],
    delivery: {
        address: string;
        recipient: string;
        contact: string;
    },
    totalPrice: number;
    totalQuantity: number;
    firstBookTitle: string;
}