import React from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const Home = () => {
  const { isLoggedIn, logout } = useAuth();
  console.log(isLoggedIn);

  const navigate = useNavigate();
  
  const logoutUser = async () => {
    navigate("/");
    logout();
  };
  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Bienvenido</h1>
          <Button variant="contained" onClick={logoutUser}>
            cerrar seccion
          </Button>
        </>
      ) : (
        <h2>Inicie seccion</h2>
      )}
    </>
  );
};

export default Home;
