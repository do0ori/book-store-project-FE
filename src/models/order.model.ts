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
    items: {
        cartItemId: number;
        bookId: number;
        quantity: number;
    }[],
    delivery: Delivery,
    totalPrice: number;
    totalQuantity: number;
    firstBookTitle: string;
}

export interface Delivery {
    address: string;
    recipient: string;
    contact: string;
}