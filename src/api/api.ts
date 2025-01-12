import { collection, doc, getDoc, getDocs, query, updateDoc, DocumentData, QuerySnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Book, User } from "../interfaces/API";

const collectionName = '';

// Update
export const updateItem = async (id: string, obj: Partial<Book | User>): Promise<void> => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj);
};

// Read
export const getBooks = async (): Promise<Book[]> => {
    const colRef = collection(db, 'books');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection<Book>(result);
};

export const getUser = async (): Promise<User[]> => {
    const colRef = collection(db, 'users');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection<User>(result);
};

export const getUsersById = async (uid: string): Promise<User | undefined> => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as User | undefined;
};

const getArrayFromCollection = <T>(collection: QuerySnapshot<DocumentData>): T[] => {
    return collection.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as T;
    });
};