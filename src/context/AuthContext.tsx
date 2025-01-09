import {createContext } from "react";

// Define la interfaz para el contexto
export interface AuthContextType {
  isLoggedIn:  string | null; 
  login: (email: string, password: string) => void; 
  logout: () => void;
  loading: boolean | null; 
}


export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
  loading: false
});

