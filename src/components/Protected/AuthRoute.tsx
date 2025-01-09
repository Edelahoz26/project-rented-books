import { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const AuthRoute = ({ children }: PropsWithChildren) => {
    const { isLoggedIn, loading } = useAuth();
    if (loading) return <h1>Loading...</h1>;
    if (isLoggedIn) return <Navigate to={"/home"} />;
    return <>{children}</>;
  }

  export default AuthRoute;
  