import { setupWorker } from "msw/browser"
import { addReview, reviewsById } from "./review";

const handler = [reviewsById, addReview];

export const worker = setupWorker(...handler);