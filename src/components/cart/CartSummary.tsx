import styled from 'styled-components';
import { formatNumber } from '../../utils/format';
import Title from '../common/Title';

interface Props {
    totalQuantity: number;
    totalPrice: number;
}

function CartSummary({ totalQuantity, totalPrice }: Props) {
    return (
        <CartSummaryStyle>
            <Title size="medium" color="text">주문 요약</Title>
            <dl>
                <dt>총 수량</dt>
                <dd>{totalQuantity} 권</dd>
            </dl>
            <dl>
                <dt>총 금액</dt>
                <dd>{formatNumber(totalPrice)} 원</dd>
            </dl>
        </CartSummaryStyle>
    );
}

const CartSummaryStyle = styled.div`
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
    width: 240px;

    h1 {
        padding: 0 0 24px 0;
    }

    dl {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        dd {
            font-weight: 700;
        }

    }

    @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
        width: 100%;

        h1 {
            padding: 0;
        }

        dl {
            dt, dd {
                font-size: 1rem;
            }
        }
    }
    `;

export default CartSummary;