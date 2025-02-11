interface BookCardProps{
    items: Book[]
  }

export interface Book {
    name: string;
    autor: string;
    description: string;
    imgLink: string;
}

/* // create books
export interface CreateItemBook{
    autor: string;
    name: string;
    description: string;
    imgLink: string;
} */