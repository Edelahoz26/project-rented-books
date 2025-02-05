import {  TextField, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface itemFormData {
  autor: string;
  name: string;
  description: string;
  imgLink: string;
}

const CreateBooks = () => {
  const [formData, setFormData] = useState<itemFormData>({
    autor: "",
    name: "",
    description: "",
    imgLink: "",
  })

 const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event: React.FormEvent) => {
      event.preventDefault(); 
      

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
