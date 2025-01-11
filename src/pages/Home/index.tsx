import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router";
import CardHome from "../../components/Card";
import { CardHomeItem } from "../../types/homeCard";
import donquijoteIMG from "../../assets/img/donquijote.webp"

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { getBooks, getUser, getUsersById } from "../../api/api";

const Home = () => {


  const { isLoggedIn, logout, loading } = useAuth();


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
  const [isAdmin , setIsAdmin] = useState()
  const getUsers= async () =>{
    const usersAdmin = await getUsersById(isLoggedIn)
    console.log(usersAdmin)
    setIsAdmin(usersAdmin?.isAdmin)
  }

useEffect(()=>{
  getUsers();
},[]);
  
  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="h-screen bg-custom-dark bg-backgroundCard bg-custom-gradient divide-y divide-slate-500">
            <nav className="h-[7%] w-full ">
              <div className=" h-full flex">
                <div className="flex py-3 pl-4 gap-3">
                  <Button className="w-40 " variant="contained" color="error" onClick={logoutUser}>
                    cerrar seccion
                  </Button>
                  {isAdmin &&
                   <Button className="w-40 " variant="contained" color="primary" onClick={logoutUser}>
                    Admin
                  </Button>}
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
                  <Outlet />
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
