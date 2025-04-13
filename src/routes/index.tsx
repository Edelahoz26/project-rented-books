import React, { lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import { getUsersById } from "../api/api";
import useAuth from "../hooks/useAuth";

// Rutas protegidas
import AuthRoute from "../components/Protected/AuthRoute";
import ProjectedRoute from "../components/Protected/ProjectedRoute";
import GetBooks from "../components/Layout/Dashboard/DashboardBooks/GetBooks";

// Páginas públicas
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

//  Pagina de administrador
const AdminDashboard = lazy(() => import("../pages/Admin"));
const CreateBooks = lazy(
  () => import("../components/Layout/Dashboard/DashboardBooks/CreateBooks")
);

// Layouts Home
const Books = lazy(() => import("../components/Layout/Books"));
const Borrowed = lazy(() => import("../components/Layout/Borrowed"));

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [isAdmin, setIsAdmin] = useState();
  const getUsers = async () => {
    try {
      const usersAdmin = await getUsersById(isLoggedIn as string);
      setIsAdmin(usersAdmin?.isAdmin);
    } catch (error) {
      console.log(error);
    }
  };
  getUsers();

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route
          element={
            <ProjectedRoute>
              <Home />
            </ProjectedRoute>
          }
        >
            {isAdmin === true && (
              <Route path="/dashboard" element={<AdminDashboard />}>
                {/* Rutas hijas del layout de administrador */}
                <Route index element={<h2 className="text-blue-600">Bienvenido al Dashboard</h2>} />
                <Route path="create-books" element={<CreateBooks />} />
                <Route path="books" element={<GetBooks />} />
              </Route>
            )}
          
          <Route
            path="/libros"
            element={
              <ProjectedRoute>
                <Books />
              </ProjectedRoute>
            }
          />
          <Route
            path="/prestados"
            element={
              <ProjectedRoute>
                <Borrowed />
              </ProjectedRoute>
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
