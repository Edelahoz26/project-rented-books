import React, { useEffect, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";

import { Book } from "../../../../../interfaces/Book";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../../../firebase/firebaseConfig";
import { Box, CircularProgress } from "@mui/material";

//simple data example - Check out https://www.material-react-table.com/docs/examples/remote for a more complex example

const GetBooks = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCard = async () => {
    try {
      const q = query(collection(db, 'books'), orderBy('createdAt', 'desc')); 
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
  ];

  if (loading) return <div className="flex justify-center pt-56"><CircularProgress color="primary" /></div>

  return <MaterialReactTable columns={columns} data={bookData} />;
};

export default GetBooks;
