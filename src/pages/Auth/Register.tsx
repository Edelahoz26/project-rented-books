import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";


interface itemFormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {

  const [formData, setFormData] = useState<itemFormData>({
    name: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault(); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        isAdmin: false
      })
     navigate('/home');
    } catch (error) {
      if (typeof error == 'undefined'){
        console.log('Error indefinido');
      }else{
        const {message} = error as Error
        console.log(message)
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
              Registrate
            </h1>
            <TextField
              id="filled-basic"
              label="Nombre"
              variant="outlined"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              required
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
              label="Correo"
              variant="outlined"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              required
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
              required
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
                Registrarse
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
