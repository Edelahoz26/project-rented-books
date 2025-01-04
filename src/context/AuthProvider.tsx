import { FC, ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setAuth] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setAuth(storedUser)
    }
  }, []);

  const login = (userData: string) => {
    localStorage.setItem('user', userData);
    setAuth(userData);
  };

  const logout = () => {
    localStorage.removeItem('user')
    setAuth(null);
  };

  const valueContext: AuthContextType = {
    isLoggedIn,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
