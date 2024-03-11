import { setupWorker } from "msw/browser"
import { addReview, reviewForMain, reviewsById } from "./review";
import { bestBooks } from "./books";
import { banners } from "./banner";

const handler = [reviewsById, addReview, reviewForMain, bestBooks, banners];

export const worker = setupWorker(...handler);