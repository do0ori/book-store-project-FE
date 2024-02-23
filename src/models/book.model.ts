export interface Book {
    id: number;
    title: string;
    imageId: number;
    summary: string;
    author: string;
    price: number;
    likes: number;
    liked: boolean;
    publishedDate: string;
}

export interface BookDetail extends Book {
    categoryName: string;
    form: string;
    isbn: string;
    pages: number;
    detail: string;
    tableOfContents: string;
}