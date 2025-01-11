import { collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig";

const collectionName = ''

//update
export const updateItem = async(id, obj) =>{
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj);
}

//read
export const getBooks= async ()=>{
    const colRef = collection(db,'books');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result)
}

export const getUser = async()=>{
    const colRef = collection(db, 'users');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

export const getUsersById = async(uid)=>{
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

const getArrayFromCollection = (collection) =>{
    return collection.docs.map((doc)=>{
        return {...doc.data(), id: doc.id}
    })
}