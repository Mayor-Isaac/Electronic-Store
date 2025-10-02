import React from 'react'
import { FaHome, FaRegularHome } from "react-icons/fa";
import { Link, Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="flex flex-col h-dvh">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <footer className=" flex items-center justify-between border h-20">
        <Link to="/">
          <FaRegularHome className="size-6 text-blue-500" />
          <p>Home</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </footer>
    </div>
  );
}
