import {  TextField, Button } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
/* import { createBooksById } from "../../../../../api/api"; */
import useAuth from "../../../../../hooks/useAuth";
import { Book } from "../../../../../interfaces/Book";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../../firebase/firebaseConfig";

const CreateBooks = () => {
  const [formData, setFormData] = useState<Book>({
    autor: "",
    name: "",
    description: "",
    imgLink: "",
  })

  const {isLoggedIn} = useAuth();

 const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async(event: FormEvent) => {
      event.preventDefault();
      try {
        await addDoc(collection(db, 'books'), {
          id: isLoggedIn,
          autor: formData.autor,
          name: formData.name,
          description: formData.description,
          imgLink: formData.imgLink,
          createdAt: new Date(),
        })
        setFormData({
          autor: "",
          name: "",
          description: "",
          imgLink: "",
        });
        alert('Libro creado exitosamente')
      } catch (error) {
        if (typeof error == 'undefined') {
          console.log(`Error al crear el Libro: ${error}`)
        }
      }
/*       if (isLoggedIn && isAdmin) {
        try {
          await setDoc(doc(db, 'books', isLoggedIn), {
            autor: formData.autor,
            name: formData.name,
            description: formData.description,
            imgLink: formData.imgLink,
            userID: isLoggedIn
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Usuario no esta logeado y no es Administrador");
      } */
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="m-7">
        <div className="flex gap-5 mb-5 flex-wrap">
        <TextField label="Autor del libro" variant="outlined" value={formData.autor} onChange={handleInputChange} name="autor" required/>
        <TextField label="Nombre del libro" variant="outlined" value={formData.name} onChange={handleInputChange} name="name" required/>
        <TextField label="Descripcion" variant="outlined" value={formData.description} onChange={handleInputChange} name="description" required/>
        <TextField label="Link de la imagen" variant="outlined" value={formData.imgLink} onChange={handleInputChange} name="imgLink" required/>
        </div>
        <Button type="submit" variant="outlined" size="large">Crear Libro</Button>
      </form>
    </div>
  );
};

export default CreateBooks;
