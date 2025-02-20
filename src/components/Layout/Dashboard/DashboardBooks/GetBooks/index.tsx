import { useEffect, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Book } from "../../../../../interfaces/Book";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../../../firebase/firebaseConfig";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

//simple data example - Check out https://www.material-react-table.com/docs/examples/remote for a more complex example

const GetBooks = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataRowTable, setEditRowTable] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true);

  const getCard = async () => {
    try {
      const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const booksData: Book[] = querySnapshot.docs.map((doc) => ({
        autor: doc.data().autor,
        name: doc.data().name,
        description: doc.data().description,
        imgLink: doc.data().imgLink,
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setBookData(booksData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCard();
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

  const handleEdit = (book: Book) => {
    setOpenModal(true);
    setEditRowTable(book);
    console.log("Editing:", book);
  };

  const handleDelete = (book: Book) => {
    console.log("Editing:", book);
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
          <div className="flex flex-col">
            <label className="text-red-500">{dataRowTable?.autor}</label>
            <label className="text-blue-500">{dataRowTable?.name}</label>
            <label className="text-green-500">{dataRowTable?.imgLink}</label>
          </div>

          <Button variant="contained" onClick={() => setOpenModal(false)}>
            {" "}
            volver
          </Button>
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
