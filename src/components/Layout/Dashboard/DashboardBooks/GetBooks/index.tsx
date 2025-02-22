import { useEffect, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Book } from "../../../../../interfaces/Book";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../../../firebase/firebaseConfig";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UpdateBooks from "./UpdateBooks";
import { deleteBook } from "../../../../../api/api";

//simple data example - Check out https://www.material-react-table.com/docs/examples/remote for a more complex example

const GetBooks = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataRowTable, setEditRowTable] = useState<Book>({
    autor: "",
    name: "",
    description: "",
    imgLink: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const booksData: Book[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        autor: doc.data().autor,
        name: doc.data().name,
        description: doc.data().description,
        imgLink: doc.data().imgLink,
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setBookData(booksData);
      setLoading(false);
    });

    return () => unsubscribe(); // Limpia la suscripción cuando el componente se desmonta
  }, []);

  // Definir las columnas de la tabla
  const columns: MRT_ColumnDef<Book>[] = [
    {
      accessorKey: "autor",
      header: "Nombre del Autor",
    },
    {
      accessorKey: "name",
      header: "Nombre del Libro",
    },
    {
      accessorKey: "description",
      header: "descripcion",
    },
    {
      accessorKey: "imgLink",
      header: "Link de la img",

      Cell: ({ row, renderedCellValue }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img
            alt="avatar"
            height={30}
            width={60}
            src={row.original.imgLink}
            loading="lazy"
            style={{ borderRadius: "50%" }}
          />
          <span>{renderedCellValue}</span>
        </Box>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de Creación",
      Cell: ({ cell }) => {
        const date = cell.getValue<Date>();
        return date ? date.toLocaleDateString() : "N/A";
      },
    },
    {
      id: "actions",
      header: "Actions",
      size: 150, // Ajusta el ancho de la columna
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          {/* Botón de editar */}
          <IconButton
            color="primary"
            onClick={() => handleEdit(row.original)}
            aria-label="edit"
          >
            <Edit />
          </IconButton>
          {/* Botón de eliminar */}
          <IconButton
            color="error"
            onClick={() => handleDelete(row.original)}
            aria-label="delete"
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  //Actualiza los libros
  const handleEdit = (book: Book) => {
    setOpenModal(true);
    setEditRowTable(book);
  };

  //Elimina los libros por su id
  const handleDelete = (book: Book) => {
    if (book.id) {
      deleteBook(book.id);
    } else {
      console.error("Book ID is undefined");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center pt-56">
        <CircularProgress color="primary" />
      </div>
    );

  return (
    <>
      {openModal ? (
        <div className="transition-all">
          <Button variant="contained" className="!ml-5 !mt-5" color="success" startIcon={<ArrowBackIcon />} onClick={() => setOpenModal(false)}>
            {" "}
            volver
          </Button>
          <UpdateBooks dataRowTable={dataRowTable} setEditRowTable={setEditRowTable} setOpenModal={setOpenModal}/>
          
        </div>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={bookData}
          muiTableContainerProps={{
            sx: { maxHeight: "500px", width: "100%" },
          }}
          muiTablePaperProps={{
            sx: { width: "100%", height: "100%" },
          }}
          muiTableBodyRowProps={{
            sx: { height: "60px" },
          }}
        />
      )}
    </>
  );
};

export default GetBooks;
