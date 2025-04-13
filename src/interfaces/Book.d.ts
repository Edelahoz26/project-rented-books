import { FieldValue } from "firebase/firestore";
import React from "react";

interface BookCardProps{
    items: Book[];
    rentBook: (bookData: Book) => void;
    setIndexBook: (index: number) => void;
  }

export interface Book {
    name: string;
    autor: string;
    description: string;
    imgLink: string;
    id?: string;
    available?: boolean;
    updatedAt?: FieldValue;
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