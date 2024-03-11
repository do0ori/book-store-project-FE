import { http, HttpResponse } from "msw";
import { fakerKO as faker } from '@faker-js/faker';
import { Book } from "@/models/book.model";

const bestBooksData: Book[] = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    title: faker.lorem.sentence(),
    imageId: faker.helpers.rangeToNumber({ min: 100, max: 200 }),
    summary: faker.lorem.paragraph(),
    author: faker.person.firstName(),
    price: faker.helpers.rangeToNumber({ min: 10000, max: 50000 }),
    likes: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
    liked: false,
    publishedDate: faker.date.past().toISOString(),
}));

export const bestBooks = http.get("http://localhost:7777/api/books/best", () => {
    return HttpResponse.json(bestBooksData, {
        status: 200
    });
});