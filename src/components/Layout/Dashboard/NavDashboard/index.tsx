import React, { FC } from "react";
import { ItemPropsDashboard } from "../../../../interfaces/Dashboard";
import { Link } from "react-router";

const NavDashboard: FC<ItemPropsDashboard> = ({items}) => {
  return (
    <ul className="text-white flex flex-col px-5 py-4 ">
      {items.map((item, index) => (
        <li key={index} className="border border-r-8 rounded-lg p-2 hover:bg-slate-600 mb-5 hover:text-blue-400 transition ">
          <Link to={`${item.link}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavDashboard;
