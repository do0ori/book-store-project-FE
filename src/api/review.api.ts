import { BookReviewItem, BookReviewItemWrite } from "@/models/review.model";
import { httpClient } from "./http";

export const fetchBookReview = async (bookId: string) => {
    const response = await httpClient.get<BookReviewItem[]>(`/reviews/${bookId}`);
    return response.data;
};

export const addBookReview = async (bookId: string, data: BookReviewItemWrite) => {
    const response = await httpClient.post<{ message: string }>(`/reviews/${bookId}`, data);
    return response.data;
};