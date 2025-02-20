import React from "react";

interface BookCardProps{
    items: Book[]
  }

export interface Book {
    name: string;
    autor: string;
    description: string;
    imgLink: string;
    id?: string;
}

//actualizacion
export interface UpdateBooksProps {
    dataRowTable: Book;
    setEditRowTable: React.Dispatch<React.SetStateAction<Book>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  }

/* // create books
export interface CreateItemBook{
    autor: string;
    name: string;
    description: string;
    imgLink: string;
} */