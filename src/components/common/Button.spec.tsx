/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import Button from './Button';

describe("Button 컴포넌트 테스트", () => {
    it("렌더 확인", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );
        
        expect(screen.getByText("버튼")).toBeInTheDocument();
    });

    it("size 및 scheme props 적용", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole("button")).toHaveStyle({
            fontSize: "1.5rem",
            padding: "1rem 2rem",
            color: "white",
            backgroundColor: "midnightblue"
        })
    });

    it("disabled props 적용", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary" disabled={true}>버튼</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole("button")).toHaveStyle({
            opacity: 0.5,
            "pointer-events": "none",
            cursor: "none"
        })
    });
});