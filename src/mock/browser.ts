import { setupWorker } from "msw/browser"
import { addReview, reviewForMain, reviewsById } from "./review";

const handler = [reviewsById, addReview, reviewForMain];

export const worker = setupWorker(...handler);