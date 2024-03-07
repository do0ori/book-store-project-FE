import { BookReviewItem } from "@/models/review.model";
import { httpClient } from "./http";

export const fetchBookReview = async (bookId: string) => {
    const response = await httpClient.get<BookReviewItem[]>(`/reviews/${bookId}`);
    return response.data;
};