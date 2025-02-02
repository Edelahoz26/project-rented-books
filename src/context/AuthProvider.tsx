import { FC, ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean | null >(true);
  const [isLoggedIn, setAuth] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setAuth(storedUser)
    }
  }, []);

  const login = async(email: string, password: string) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    /* localStorage.setItem('user', userCredentials); */
    console.log(userCredentials);
  };

  const logout = () => {
    signOut(auth)
  };

  const getIsAdmin = (isAdmin: boolean | null) => {
    setIsAdmin(isAdmin)
  }
  useEffect(()=> {
    //analiza el estado del usuario
    onAuthStateChanged(auth, currentUser => {
      setAuth(currentUser?.uid ?? null);
      setLoading(false);
    })
  },[])

  const valueContext: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    getIsAdmin,
    isAdmin,
    loading,
    
  };
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
