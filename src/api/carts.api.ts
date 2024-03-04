import { Cart } from "../models/cart.model";
import { httpClient } from "./http";

interface AddCartParams {
    bookId: number;
    quantity: number;
}

export const addCart = async (params: AddCartParams) => {
    const response = await httpClient.post("/cart", params);
    return response.data;
};

export const fetchCart = async () => {
    const response = await httpClient.get<Cart[]>("/cart");
    return response.data;
};

export const deleteCart = async (itemId: number) => {
    const response = await httpClient.delete(`/cart/${itemId}`);
    return response.data;
};