import { collection, doc, getDoc, getDocs, query, updateDoc, DocumentData, QuerySnapshot, deleteDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { User } from "../interfaces/API";
import { Book } from "../interfaces/Book";

// Actulizar libros
export const updateBook = async (id: string, obj: Partial<Book | User>): Promise<void> => {
    const docRef = doc(db, 'books', id);
    await updateDoc(docRef, obj);
    console.log('Libro actualizado exitosamente');
};

// Eliminar libros
export const deleteBook = async (bookId: string): Promise<void> => {
    const bookRef = doc(db, 'books', bookId);
    await deleteDoc(bookRef);
    console.log('Libro eliminado exitosamente');
};

// Leer los usuarios
export const getUser = async (): Promise<User[]> => {
    const colRef = collection(db, 'users');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection<User>(result);
};

//Leer usuarios por su ID
export const getUsersById = async (uid: string): Promise<User | undefined> => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as User | undefined;
};

// Crear Libro
export const createBooksById = async(uid:string, obj: Partial<Book>): Promise<void> =>{
    const userRef = doc(db, 'books', uid);
    await updateDoc(userRef, obj);
}

// Leer libro
export const getBooks = async (): Promise<Book[]> => {
    const colRef = collection(db, 'books');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection<Book>(result);
};

// Añade los libros rentado a la tabla de users con el campo de rentedBooks
export const rentBookToUser = async (userId: string, bookData: object): Promise<void> => {
    try {
      const userRef = doc(db, "users", userId);
  
      await updateDoc(userRef, {
        rentedBooks: arrayUnion(bookData),
        lastUpdated: serverTimestamp(), // Agrega el libro al array
      });
  
      alert("Libro rentado exitosamente");
    } catch (error) {
      console.error(`Error al rentar el libro: ${error}`);
    }
  };

//
const getArrayFromCollection = <T>(collection: QuerySnapshot<DocumentData>): T[] => {
    return collection.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, } as T;
    });
};