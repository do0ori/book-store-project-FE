/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';

const dummyBook: Book = {
    id: 1,
    title: "Dummy Book",
    imageId: 5,
    summary: "Dummy Summary",
    author: "Dummy Author",
    price: 20000,
    likes: 1,
    liked: false,
    publishedDate: "2023-04-10"
};

describe("BookItem 컴포넌트 테스트", () => {
    it("렌더 확인", () => {
        render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook} />
            </BookStoreThemeProvider>
        );

        expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
        expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
        expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
        expect(screen.getByText("20,000원")).toBeInTheDocument();
        expect(screen.getByText(dummyBook.likes)).toBeInTheDocument();
        expect(screen.getByAltText(dummyBook.title)).toHaveAttribute("src", `https://picsum.photos/id/${dummyBook.imageId}/300/300`);
    });
});