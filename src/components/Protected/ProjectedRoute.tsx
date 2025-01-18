import { PropsWithChildren, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";
import { getUsersById } from "../../api/api";

const ProjectedRoute =({ children }: PropsWithChildren)=> {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return ;
  if (!isLoggedIn) return <Navigate to={"/"} />;

  return <>{children}</>;
}

export default ProjectedRoute;