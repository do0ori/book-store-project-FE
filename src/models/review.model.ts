export interface BookReviewItem {
    id: number;
    reviewer: string;
    comment: string;
    createdAt: string;
    score: number;
}

export type BookReviewItemWrite = Pick<BookReviewItem, "comment" | "score">;