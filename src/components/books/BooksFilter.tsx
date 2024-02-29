import styled from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystrings';

function BooksFilter() {
    const { category } = useCategory();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCategory = (id: number | null) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (id === null) {
            newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
        } else {
            newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
        }

        setSearchParams(newSearchParams);
    };

    const handleNews = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (newSearchParams.get(QUERYSTRING.RECENT)) {
            newSearchParams.delete(QUERYSTRING.RECENT);
        } else {
            newSearchParams.set(QUERYSTRING.RECENT, "true");
        }

        setSearchParams(newSearchParams);
    };

    return (
        <BooksFilterStyle>
            <div className="category">
                {
                    category.map(item => (
                        <Button
                            key={item.id}
                            size="medium"
                            scheme={item.isActive ? "primary" : "normal"}
                            onClick={() => handleCategory(item.id)}>
                            {item.name}
                        </Button>
                    ))
                }
            </div>
            <div className="recent">
                <Button size="medium" scheme={searchParams.get(QUERYSTRING.RECENT) ? "primary" : "normal"} onClick={handleNews}>신간</Button>
            </div>
        </BooksFilterStyle>
    );
}

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category {
        display: flex;
        gap: 8px;
    }
`;

export default BooksFilter;