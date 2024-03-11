import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import { useMemo, useState } from 'react';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import { useAlert } from '../hooks/useAlert';
import { OrderSheet } from '../models/order.model';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { showAlert, showConfirm } = useAlert();
    const navigate = useNavigate();

    const { carts, isEmpty, deleteCartItem } = useCart();
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleCheckItem = (itemId: number) => {
        if (checkedItems.includes(itemId)) {
            setCheckedItems(checkedItems.filter((id) => id !== itemId));
        } else {
            setCheckedItems([...checkedItems, itemId]);
        }
    };

    const handleDeleteItem = (itemId: number) => {
        deleteCartItem(itemId);
    };

    const totalQuantity = useMemo(() => {
        return carts.reduce((acc, cart) =>
            checkedItems.includes(cart.itemId)
                ? acc + cart.quantity
                : acc, 0);
    }, [carts, checkedItems]);

    const totalPrice = useMemo(() => {
        return carts.reduce((acc, cart) =>
            checkedItems.includes(cart.itemId)
                ? acc + cart.price * cart.quantity
                : acc, 0);
    }, [carts, checkedItems]);

    const handleOrder = () => {
        if (checkedItems.length === 0) {
            showAlert("주문할 상품을 선택해 주세요.");
            return;
        }

        const selectedCarts = carts.filter((cart) => checkedItems.includes(cart.itemId));
        const items = selectedCarts.map((cart) => ({
            cartItemId: cart.itemId,
            bookId: cart.bookId,
            quantity: cart.quantity
        }));
        const orderData: Omit<OrderSheet, "delivery"> = {
            items,
            totalPrice,
            totalQuantity,
            firstBookTitle: selectedCarts[0].title,
        };

        showConfirm("주문하시겠습니까?", () => {
            navigate("/order", { state: orderData });
        });
    };

    return (
        <>
            <Title size="large">장바구니</Title>
            <CartStyle>
                {
                    !isEmpty && (
                        <>
                            <div className="content">
                                {
                                    carts.map((cart) => (
                                        <CartItem
                                            key={cart.itemId}
                                            cart={cart}
                                            checkedItems={checkedItems}
                                            onCheck={handleCheckItem}
                                            onDelete={handleDeleteItem} />
                                    ))
                                }
                            </div>
                            <div className="summary">
                                <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
                                <Button size="large" scheme="primary" onClick={handleOrder}>주문하기</Button>
                            </div>
                        </>
                    )
                }
                {
                    isEmpty && (
                        <Empty
                            title="장바구니가 비었습니다."
                            icon={<FaShoppingCart />}
                            description={<>장바구니를 채워보세요.</>}
                        />
                    )
                }
            </CartStyle>
        </>
    );
}

export const CartStyle = styled.div`
    display: flex;
    gap: 24px;
    justify-content: space-between;
    padding: 24px 0 0 0;

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .summary {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .order-info {
        h1 {
            padding: 0 0 24px 0;
        }

        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        padding: 12px;
    }

    .delivery {
        fieldset {
            border: 0;
            margin: 0;
            padding: 0 0 12px 0;
            display: flex;
            justify-content: start;
            gap: 8px;
    
            label {
                width: 80px;
            }
    
            .input {
                flex: 1;
    
                input {
                    width: 100%;
                }
            }
        }

        .error-text {
            color: red;
            margin: 0;
            padding: 0 0 12px 0;
            text-align: right;
        }
    }

    @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
        flex-direction: column;
        gap: 12px;
        padding: 12px 0 0 0;

        button {
            font-size: 0.75rem;
            padding: 10px 5px;
        }

        h1 {
            font-size: 1rem;
        }

        p {
            font-size: 0.8rem;
        }

        .summary {
            gap: 12px;
        }
    }
`;

export default Cart;