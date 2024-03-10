import { fetchBooks } from "@/api/books.api";
import { fetchReviewAll } from "@/api/review.api";
import { Book } from "@/models/book.model";
import { BookReviewItem } from "@/models/review.model";
import { useEffect, useState } from "react";

export const useMain = () => {
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetchReviewAll()
            .then((reviews) => {
                setReviews(reviews);
            });

        fetchBooks({
            recent: true,
            limit: 4,
            page: 1
        }).then(({ books }) => {
            setNewBooks(books);
        });
    }, []);

    return { reviews, newBooks };
};