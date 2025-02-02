import {createContext } from "react";

// Define la interfaz para el contexto
export interface AuthContextType {
  login: (email: string, password: string) => void; 
  logout: () => void;
  getIsAdmin: (isAdmin: boolean | null) => void 
  isLoggedIn:  string | null; 
  isAdmin: boolean | null
  loading: boolean | null; 
}


export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  getIsAdmin: () => {},
  isLoggedIn: null,
  isAdmin: null,
  loading: false
});

