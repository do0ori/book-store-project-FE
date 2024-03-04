import styled from 'styled-components';
import { Pagination as IPagination } from '../../models/pagination.model';
import Button from '../common/Button';
import { LIMIT } from '../../constants/pagination';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystrings';

interface Props {
    pagination: IPagination;
}

function Pagination({ pagination }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { currentPage, totalCount } = pagination;
    const pages: number = Math.ceil(totalCount / LIMIT);

    const handleClickPage = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(QUERYSTRING.PAGE, page.toString());
        setSearchParams(newSearchParams);
    };

    return (
        <PaginationStyle>
            {
                pages > 0 && (
                    <ol>
                        {
                            Array(pages).fill(0).map((_, i) => (
                                <li key={i}>
                                    <Button
                                        size="small"
                                        scheme={i + 1 === currentPage ? "primary" : "normal"}
                                        onClick={() => handleClickPage(i + 1)}>
                                        {i + 1}
                                    </Button>
                                </li>
                            ))
                        }
                    </ol>
                )
            }
        </PaginationStyle>
    );
}

const PaginationStyle = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 24px 0;

    ol {
        list-style: none;
        display: flex;
        gap: 8px;
        padding: 0;
        margin: 0;
    }
`;

export default Pagination;