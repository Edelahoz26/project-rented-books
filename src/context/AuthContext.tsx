import {createContext } from "react";

// Define la interfaz para el contexto
export interface AuthContextType {
  isLoggedIn:  string | null; 
  login: (userData: string) => void; 
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
});

