import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

interface itemFormData {
  email: string;
  password: string;
}

const Login = () => {

  const [formData, setFormData] = useState<itemFormData>({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const {login} = useAuth()
  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault(); 
    try {
     await login(formData.email, formData.password);
     navigate('/home');

    } catch (error) {
      
      if (typeof error === 'undefined') {
        console.log('Error indefinido');
      } else {
        const {message} = error as Error
        console.log(message, "mensaje")
        alert(message);
      }

    }
  };
  return (
    <div className="bg-custom-dark bg-backgroundCard bg-custom-gradient h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-900 h-auto w-[30%] p-6 shadow-lg shadow-blue-700/20 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start h-full justify-start gap-10"
          >
            <h1 className=" font-bold text-4xl  text-white ">
              Iniciar seccion
            </h1>
            <TextField
              id="filled-basic"
              label="Correo"
              variant="outlined"
              value={formData.email}
              name="email"
              required
              onChange={handleInputChange}
              sx={{
                width: "100%",

                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "hsl(220, 20%, 65%)",
                  },
                },
              }}
              slotProps={{
                input: {
                  style: { color: "hsl(220, 20%, 65%)" },
                },
              }}
            />
            <TextField
              id="filled-basic"
              label="Contraseña"
              variant="outlined"
              value={formData.password}
              name="password"
              required
              onChange={handleInputChange}
              sx={{
                width: "100%",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "hsl(220, 20%, 65%)",
                  },
                },
              }}
              slotProps={{
                input: {
                  style: { color: "hsl(220, 20%, 65%)" },
                },
              }}
            />
            <div>
              <h1 className="text-white"> ¿No tienes una cuenta? <Link to={'/register'} className="text-blue-700 hover:text-blue-600 cursor-pointer">Registrate</Link></h1>
            </div>
            <div className="flex justify-center w-full">
              <Button type="submit" variant="outlined">
                Ingresar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
