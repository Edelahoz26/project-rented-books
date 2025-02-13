import React from "react";
import { Outlet } from "react-router";
import { ItemNav } from "../../interfaces/Dashboard";
import NavDashboard from "../../components/Layout/Dashboard/NavDashboard";


const AdminDashboard = () => {
      const itemNav: ItemNav[] = [
        {title: 'Crear libros', link: '/dashboard/create-books'},
        {title: 'Libros Creados', link: '/dashboard/books'},
        {title: 'Crear libros', link: ''},
     ]

  return (
    <div className="relative h-[855px]   divide-slate-500 ">
      <div className=" fixed z-10 h-full w-72 left-0 border-r-[0.5px]  border-r-slate-500">
        <NavDashboard items={itemNav}/>
      </div>
      <div className=" ">
        <div className=" flex flex-col pl-72 w-full h-auto  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
