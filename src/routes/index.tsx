import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import AuthRoute from "../components/Protected/AuthRoute";
import ProjectedRoute from "../components/Protected/ProjectedRoute";

// Layouts
/* import UserLayout from "../components/Layouts/UserLayout";
import AdminLayout from "../components/Layouts/AdminLayout"; */

// Páginas de usuario
/* import Home from "../pages/User/Home";
import BookDetails from "../pages/User/BookDetails";
import MyRentals from "../pages/User/MyRentals";
import Profile from "../pages/User/Profile"; */

// Páginas de administrador
/* import Dashboard from "../pages/Admin/Dashboard";
import ManageBooks from "../pages/Admin/ManageBooks";
import ManageUsers from "../pages/Admin/ManageUsers";
import Reports from "../pages/Admin/Reports"; */

// Páginas públicas
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/home"
          element={
            <ProjectedRoute>
              <Home />
            </ProjectedRoute>
          }
        />

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

        {/* Rutas protegidas para usuarios */}
        {/*         <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="book/:id" element={<BookDetails />} />
          <Route path="my-rentals" element={<MyRentals />} />
          <Route path="profile" element={<Profile />} />
        </Route> */}

        {/* Rutas protegidas para administradores */}
        {/*         <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-books" element={<ManageBooks />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="reports" element={<Reports />} />
        </Route> */}

        {/* Ruta para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
