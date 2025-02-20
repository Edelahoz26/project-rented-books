import { useEffect, useState } from "react";
import CardHome from "../../Card"
import { getBooks } from "../../../api/api";
import { CircularProgress } from "@mui/material";
import { Book } from "../../../interfaces/Book";

const Books = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const getCard = async() =>{
    try {
      const response = await getBooks();
      setBookData(response);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }  
  }
  
  
  useEffect(() => {
    getCard();
    
  }, [])
  

  if (loading) return <div className="w-screen text-center content-center"><CircularProgress color="primary" /></div>
                    
  return (
    <CardHome items={bookData} />
  )
}

export default Books