import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    categoryId?: number;
    recent?: boolean;
    limit: number;
    page: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>("/books", { params });
        return response.data;
    } catch (error) {
        return {
            books: [],
            pagination: {
                currentPage: 1,
                totalCount: 0
            }
        }
    }
};