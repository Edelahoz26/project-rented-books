import { TextField, Button, Box } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
/* import { createBooksById } from "../../../../../api/api"; */
import useAuth from "../../../../../hooks/useAuth";
import { Book } from "../../../../../interfaces/Book";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../firebase/firebaseConfig";

const CreateBooks = () => {
  const [formData, setFormData] = useState<Book>({
    autor: "",
    name: "",
    description: "",
    imgLink: "",
  });

  const { isLoggedIn, isAdmin } = useAuth();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.autor.trim() || !formData.name.trim() || !formData.description.trim() || !formData.imgLink.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (isLoggedIn && isAdmin) {
      try {
        await addDoc(collection(db, "books"), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        setFormData({
          autor: "",
          name: "",
          description: "",
          imgLink: "",
        });
        alert("Libro creado exitosamente");
      } catch (error) {
        if (typeof error == "undefined") {
          console.log(`Error al crear el Libro: ${error}`);
        }
      }
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="m-7">
        <div className="flex gap-5 mb-5 flex-wrap">
          <TextField
            label="Autor del libro"
            variant="outlined"
            value={formData.autor}
            onChange={handleInputChange}
            name="autor"
            required
          />
          <TextField
            label="Nombre del libro"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            required
          />
          <Box sx={{ width: 500, maxWidth: '100%' }}>

          <TextField
            label="Descripcion"
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            name="description"
            required
            multiline
            fullWidth
            rows={8}
          />
          </Box>
          <TextField
            label="Link de la imagen"
            variant="outlined"
            value={formData.imgLink}
            onChange={handleInputChange}
            name="imgLink"
            required
          />
        </div>
        <Button type="submit" variant="outlined" size="large" disabled={!formData.autor.trim() || !formData.name.trim() || !formData.description.trim() || !formData.imgLink.trim()}>
          Crear Libro
        </Button>
      </form>
    </div>
  );
};

export default CreateBooks;
