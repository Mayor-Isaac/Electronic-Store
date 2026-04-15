import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'

const tabArr = [
    {name: "Inventory", path: "/dashboard/inventory"},
    {name: "Orders & Cart", path: "/dashboard/orders-cart"},
    {name: "Content Management", path: "/dashboard/content-management"}

]
export default function TabHeader() {
    const [activeTable, setActiveTable] = useState("Inventory")
  return (
    <div className="border-b border-b-[#eaeaea] flex items-center justify-center">
      <div className="flex items-center gap-10 w-fit mx-auto">
        {tabArr.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              className={`${activeTable === item.name ? "text-blue-700 font-medium border-b-2 border-blue-700" : ""} cursor-pointer hover:font-bold transition ease-in-out text-4xl p-2 hover:border-b-2 border-blue-700`}
              onClick={() => setActiveTable(item.name)}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
