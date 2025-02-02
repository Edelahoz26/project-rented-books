import {  TextField } from "@mui/material";

const CreateBooks = () => {
  return (
    <div className="">
      <form action="" className="m-7">
        <TextField label="Autor del libro" variant="outlined"></TextField>
        <TextField label="Nombre del libro" variant="outlined"></TextField>
        <TextField label="Descripcion" variant="outlined"></TextField>
        <TextField
          label="Link de la imagen"
          variant="outlined"
          slotProps={{
            inputLabel: {
              sx: {
                color: "white",
                "&.Mui-focused": {
                  color: "#1976d2", // Color del label cuando está enfocado
                },
              },
            },
          }}
          InputProps={{
            sx: {
              color: "white", // Color del texto
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2", // Color del borde inicial
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Color del borde al pasar el mouse
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Color del borde cuando está enfocado
              },
            },
          }}
        ></TextField>
      </form>
    </div>
  );
};

export default CreateBooks;
