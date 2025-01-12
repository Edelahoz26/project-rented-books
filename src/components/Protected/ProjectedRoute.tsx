import { PropsWithChildren } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";

const ProjectedRoute =({ children }: PropsWithChildren)=> {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return ;
  if (!isLoggedIn) return <Navigate to={"/"} />;
  return <>{children}</>;
}

export default ProjectedRoute;