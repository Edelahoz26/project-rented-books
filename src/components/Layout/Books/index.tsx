import { useEffect, useState } from "react";
import CardHome from "../../Card";
import { getBooks, getUsersById, rentBookToUser } from "../../../api/api";
import { CircularProgress } from "@mui/material";
import { Book } from "../../../interfaces/Book";
import useAuth from "../../../hooks/useAuth";

const Books = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [indexBook, setIndexBook] = useState<number | undefined>(undefined);
  
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useAuth();

  const getCard = async () => {
    try {
      const response = await getBooks();
      setBookData(response);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const rentBook = async (bookDataRent: Book) => {
    try {
      
      if (isLoggedIn) {
        rentBookToUser(isLoggedIn, bookDataRent);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getBookUserById = async() => {
    try {
      if (isLoggedIn) {
        const response = await getUsersById(isLoggedIn)

              if (indexBook !== undefined) {
                if (Array.isArray(response?.rentedBooks)) {
                  console.log(response?.rentedBooks[indexBook]);
                } else {
                  console.error("rentedBooks is not an array");
                }
              }

      }
      
    } catch (error) {
      console.log(error)
    }
  }

  console.log(indexBook, 'prueba indexx')
  useEffect(() => {
    getCard();
  }, []);

  useEffect(() => {
    getBookUserById();
  }, [indexBook]);


  if (loading)
    return (
      <div className="w-screen text-center content-center">
        <CircularProgress color="primary" />
      </div>
    );

  return <CardHome items={bookData} rentBook={rentBook} setIndexBook={setIndexBook}/>;
};

export default Books;
