import { Outlet } from "react-router";
import { ItemNav } from "../../interfaces/Dashboard";
import NavDashboard from "../../components/Layout/Dashboard/NavDashboard";
import { useState } from "react";


const AdminDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

      const itemNav: ItemNav[] = [
        {id: 1, title: 'Crear libros', link: '/dashboard/create-books', selectedIndex: (index)=> setSelectedIndex(index), colorText: selectedIndex},
        {id: 2, title: 'Libros Creados', link: '/dashboard/books', selectedIndex: (index)=> setSelectedIndex(index), colorText: selectedIndex},
        {id: 3, title: 'Crear libros', link: '', selectedIndex: (index)=> setSelectedIndex(index), colorText: selectedIndex},
     ]
  return (
    <div className="relative h-[855px]   divide-slate-500 ">
      <div className=" fixed z-10 h-full w-72 left-0 border-r-[0.5px]  border-r-slate-500">
        <NavDashboard items={itemNav} />
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
