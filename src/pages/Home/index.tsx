import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router";
import CardHome from "../../components/Card";
import { CardHomeItem } from "../../types/homeCard";
import donquijoteIMG from "../../assets/img/donquijote.webp"

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";

const Home = () => {
  const { isLoggedIn, logout, loading } = useAuth();
  
  console.log(isLoggedIn);

  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  const itemCard:CardHomeItem[]  = [
    {title: 'titulo', description: 'descripcion dawdawdawdawdawddawdawdaw', imgCard: donquijoteIMG , obtainLink: '/home'},
    {title: 'titulo', description: 'descripcion dawdawdawdawdawddawdawdaw', imgCard: donquijoteIMG , obtainLink: '/home'},
    {title: 'titulo', description: 'descripcion dawdawdawdawdawddawdawdaw', imgCard: 'https://http2.mlstatic.com/D_NQ_NP_967922-MLU70795781552_082023-O.webp' , obtainLink: '/home'},
  ]


  const docRef = doc(db, "books", "lr6FHS3aGGhH7Kg0KHPXHVeMyRD2");
  const getCard = async() =>{
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  
  useEffect(() => {
    getCard();
  }, [])
  

  if (loading) return <h1>loading...</h1>
  
  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="h-screen bg-custom-dark bg-backgroundCard bg-custom-gradient divide-y divide-slate-500">
            <nav className="h-[7%] w-full ">
              <div className=" h-full flex">
                <div className="flex py-3 pl-4">
                  <Button className="w-40 " variant="contained" color="error" onClick={logoutUser}>
                    cerrar seccion
                  </Button>
                </div>
                <ul className="flex h-full w-full justify-end space-x-8 items-center p-4 text-white">
                  <li className="font-medium text-xl">
                    <Link to={"/libros"}>Libros</Link>
                  </li>
                  <li className="font-medium text-xl">
                    <Link to={"/prestados"}>Prestados</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <main className="h-[93%] ">
              <section className="h-full w-full pt-5">
                <div>
                    <CardHome items={itemCard}/>
                </div>
              </section>
            </main>
          </div>
        </>
      ) : (
        <h2>Inicie seccion</h2>
      )}
    </>
  );
};

export default Home;
