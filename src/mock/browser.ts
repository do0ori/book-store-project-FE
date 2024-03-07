import { setupWorker } from "msw/browser"
import { reviewsById } from "./review";

const handler = [reviewsById];

export const worker = setupWorker(...handler);