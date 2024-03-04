import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Order() {
    const location = useLocation();
    const orderDataFromCart = location.state;

    console.log(orderDataFromCart);

    return (
        <OrderStyle>
            <h1>Order</h1>
        </OrderStyle>
    );
}

const OrderStyle = styled.div``;

export default Order;