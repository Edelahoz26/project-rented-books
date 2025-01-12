interface BookCardProps{
    items: Book[]
  }

export interface Book {
    book: string;
    autor: string;
    description: string;
    imgCard: string;
}

export interface User {
    name: string;
    email: string;
    isAdmin: undefined;
}