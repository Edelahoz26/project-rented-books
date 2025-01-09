import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router";
import CardHome from "../../components/Card";
import { CardHomeItem } from "../../types/homeCard";
import donquijoteIMG from "../../assets/img/donquijote.webp"

const Home = () => {
  const { isLoggedIn, logout } = useAuth();
  console.log(isLoggedIn);

  const navigate = useNavigate();

  const logoutUser = async () => {
    navigate("/");
    logout();
  };

  const itemCard:CardHomeItem[]  = [
    {title: 'titulo', description: 'descripcion dawdawdawdawdawddawdawdaw', imgCard: donquijoteIMG , obtainLink: '/home'},
    {title: 'titulo', description: 'descripcion dawdawdawdawdawddawdawdaw', imgCard: donquijoteIMG , obtainLink: '/home'},
    {title: 'titulo', description: 'descripcion dawdawdawdawdawddawdawdaw', imgCard: donquijoteIMG , obtainLink: '/home'},
    
  ]
  
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
                <div className=" ">
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
