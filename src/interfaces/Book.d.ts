interface BookCardProps{
    items: Book[]
  }

export interface Book {
    book: string;
    autor: string;
    description: string;
    imgCard: string;
}

// create books
export interface CreateItemBook{
    autor: string;
    name: string;
    description: string;
    imgLink: string;
}