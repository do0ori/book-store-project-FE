import { BookReviewItem } from "@/models/review.model";
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from '@faker-js/faker';

const data: BookReviewItem[] = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    reviewer: faker.person.lastName() + faker.person.firstName(),
    comment: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({ min: 1, max: 5 })
}));

export const reviewsById = http.get("http://localhost:7777/api/reviews/:bookId", () => {
    return HttpResponse.json(data, {
        status: 200
    });
});

export const addReview = http.post("http://localhost:7777/api/reviews/:bookId", () => {
    return HttpResponse.json({
        message: "리뷰가 등록되었습니다."
    }, {
        status: 200
    });
});