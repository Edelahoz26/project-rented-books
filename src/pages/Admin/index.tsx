import React from "react";
import { Link, Outlet } from "react-router";

const AdminDashboard = () => {
  /*     const itemNav = [
        {home: }
    ]
 */
  return (
    <div className="relative h-[855px]   divide-slate-500 ">
      <div className=" fixed z-10 h-full w-72 left-0 border-r-[0.5px]  border-r-slate-500">
        <ul className="text-green-400 flex flex-col px-5 py-4">
          <li className="border border-r-8 rounded-lg p-2 hover:bg-slate-600">
            <Link to={"/dashboard/create-books"}>Crear libros</Link>
          </li>
        </ul>
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
