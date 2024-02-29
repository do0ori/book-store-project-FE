import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { useEffect, useState } from "react";
import { Pagination } from "../models/pagination.model";
import { QUERYSTRING } from "../constants/querystrings";
import { fetchBooks } from "../api/books.api";
import { LIMIT } from "../constants/pagination";

export const useBooks = () => {
    const location = useLocation();

    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalCount: 0
    });
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        fetchBooks({
            categoryId: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
            recent: params.get(QUERYSTRING.RECENT) ? true : undefined,
            limit: LIMIT,
            page: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
        }).then(({ books, pagination }) => {
            setBooks(books);
            setPagination(pagination);
            setIsEmpty(books.length === 0);
        })
    }, [location.search]);

    return { books, pagination, isEmpty };
};