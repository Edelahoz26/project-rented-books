import { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const AuthRoute = ({ children }: PropsWithChildren) => {
    const { isLoggedIn, loading } = useAuth();
    if (loading) return ;
    if (isLoggedIn) return <Navigate to={"/libros"} />;
    return <>{children}</>;
  }

  export default AuthRoute;
  