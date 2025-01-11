import { useEffect, useState } from "react";
import CardHome from "../../Card"
import { getBooks } from "../../../api/api";
import useAuth from "../../../hooks/useAuth";

const Books = () => {

  const [bookData, setBookData] = useState([]);
  const { loading } = useAuth();

  const getCard = async() =>{
    try {
      const response = await getBooks();
      console.log(response)
      setBookData(response)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }  
  }
  
  
  useEffect(() => {
    getCard();
    
  }, [])
  

  if (loading) return <h1>loading...</h1>
                    
  return (
    <CardHome items={bookData} />
  )
}

export default Books