import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import {  getUsersById } from "../../api/api";

const Home = () => {
  const { isLoggedIn, logout, getIsAdmin, isAdmin } = useAuth();
  

  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  const getUsers= async () =>{
    const usersAdmin = await getUsersById(isLoggedIn as string);
    getIsAdmin(usersAdmin?.isAdmin || false);
  }

useEffect(()=>{
  getUsers();
},[]);
  

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="h-screen   relative pt-16 ">
            <nav className="h-[7%] w-full fixed top-0 left-0 right-0 z-50 border-b-[0.5px] border-b-slate-500  bg-custom-dark bg-backgroundCard bg-custom-gradient ">
              <div className=" h-full flex  relative z-50 ">
                <div className="flex py-3 pl-4 gap-3 ">
                  <Button className="w-40 " variant="contained" color="error" onClick={logoutUser}>
                    cerrar seccion
                  </Button>
                  {isAdmin &&
                   <Button className="w-40 " variant="contained" color="primary" onClick={()=> navigate('/dashboard')}>
                      Admin
                  </Button>}
                </div>
                <ul className="flex h-full w-full justify-end space-x-8 items-center p-4 text-white ">
                  <li className="font-medium text-xl">
                    <Link to={"/libros"}>Libros</Link>
                  </li>
                  <li className="font-medium text-xl">
                    <Link to={"/prestados"}>Prestados</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <main className="h-auto relative">
              <section className="h-full w-full">
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
