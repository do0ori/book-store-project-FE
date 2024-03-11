import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../constants/querystrings";
import { fetchBooks } from "../api/books.api";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useBooksInfinite = () => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    const location = useLocation();

    const getBooks = ({ pageParam }: { pageParam: number }) => {
        const params = new URLSearchParams(location.search);
        const categoryId = params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined;
        const recent = params.get(QUERYSTRING.RECENT) ? true : undefined;
        const limit = LIMIT;
        const page = pageParam;

        setScrollPosition(window.scrollY);

        return fetchBooks({
            categoryId,
            recent,
            limit,
            page
        });
    };

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: ["books", location.search],
        queryFn: getBooks,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const isLastPage = Math.ceil(lastPage.pagination.totalCount / LIMIT) === lastPage.pagination.currentPage;

            return isLastPage ? null : lastPage.pagination.currentPage + 1;
        }
    });

    const books = data ? data.pages.flatMap((page) => page.books) : [];
    const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
    const isEmpty = books.length === 0;

    return {
        books,
        pagination,
        isEmpty,
        isBooksLoading: isFetching,
        fetchNextPage,
        hasNextPage,
        scrollPosition
    };
};