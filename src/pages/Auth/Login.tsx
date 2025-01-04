import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebaseConfig";
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
     const {user} = await signInWithEmailAndPassword(auth, formData.email, formData.password);
     navigate('/home');
     login(user.uid)
     console.log(user)
    } catch (error) {
      console.log(error)
    }
    console.log("envio de datos:", formData); // Aquí puedes manejar los datos del formulario
  };
  return (
    <div className="bg-custom-dark bg-backgroundCard bg-custom-gradient h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-900 h-[50%] w-[30%] p-6 shadow-lg shadow-blue-700/20 ">
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
              onChange={handleInputChange}
              sx={{
                width: "100%",
                border: "1px solid hsl(220, 20%, 65%)",
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
              onChange={handleInputChange}
              sx={{
                width: "100%",
                border: "1px solid hsl(220, 20%, 65%)",
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
