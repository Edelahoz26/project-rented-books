import { useEffect, useState } from "react";
import CardHome from "../../Card";
import { getBooks, rentBookToUser } from "../../../api/api";
import { CircularProgress } from "@mui/material";
import { Book } from "../../../interfaces/Book";
import useAuth from "../../../hooks/useAuth";

const Books = () => {
  const [bookData, setBookData] = useState<Book[]>([]);

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

  useEffect(() => {
    getCard();
   
  }, []);

  if (loading)
    return (
      <div className="w-screen text-center content-center">
        <CircularProgress color="primary" />
      </div>
    );

  return <CardHome items={bookData} rentBook={rentBook}/>;
};

export default Books;
