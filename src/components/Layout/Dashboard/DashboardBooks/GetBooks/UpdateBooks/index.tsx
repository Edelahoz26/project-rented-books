import { ChangeEvent, FC, FormEvent, useState } from "react"
import { UpdateBooksProps } from "../../../../../../interfaces/Book"
import { Box, Button, TextField } from "@mui/material";
import useAuth from "../../../../../../hooks/useAuth";
import { serverTimestamp } from "firebase/firestore";
import { updateBook } from "../../../../../../api/api";


const UpdateBooks: FC<UpdateBooksProps> = ({ dataRowTable, setEditRowTable, setOpenModal }) => {
  const [formData, setFormData] = useState(dataRowTable);
  const {isLoggedIn, isAdmin} = useAuth();
  
  const handleInputChange=(event: ChangeEvent<HTMLInputElement>)=> {
    const {value, name} = event.target;
    setFormData({ ...formData, [name]: value });
    setEditRowTable({...dataRowTable, [name]: value});
  } 

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (isLoggedIn && isAdmin && formData.id) {
      try {
        updateBook(formData.id, {
          autor: formData.autor,
          name: formData.name,
          description: formData.description,
          imgLink: formData.imgLink,
          updatedAt: serverTimestamp(),
        })
        alert("Libro actualizado exitosamente");
        setOpenModal(false);
      } catch (error) {
        console.error(`Error al actualizar el libro: ${error}`);
      }
    } else {
      alert("Debes ser administrador y proporcionar un ID válido para actualizar un libro.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-7">
    <div className="flex gap-5 mb-5 flex-wrap">
    <TextField label="Autor del libro" variant="outlined" value={formData.autor} onChange={handleInputChange} name="autor" required/>
    <TextField label="Nombre del libro" variant="outlined" value={formData.name} onChange={handleInputChange} name="name" required/>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField label="Descripcion" variant="outlined" value={formData.description} onChange={handleInputChange} name="description" multiline rows={8} required fullWidth/>
    </Box>
    <TextField label="Link de la imagen" variant="outlined" value={formData.imgLink} onChange={handleInputChange} name="imgLink" required/>
    </div>
    <Button type="submit" variant="outlined" size="large"  >Actualizar Libro</Button>
  </form>
  )
}

export default UpdateBooks