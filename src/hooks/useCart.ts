import { useEffect, useState } from "react";
import { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isEmpty, setIsEmpty] = useState(true);

    const deleteCartItem = (itemId: number) => {
        deleteCart(itemId)
            .then(() => {
                setCarts(carts.filter((cart) => cart.itemId !== itemId))
            });
    };

    useEffect(() => {
        fetchCart()
            .then((carts) => {
                setCarts(carts);
            });
    }, []);

    useEffect(() => {
        setIsEmpty(carts.length === 0);
    }, [carts]);

    return { carts, isEmpty, deleteCartItem };
};