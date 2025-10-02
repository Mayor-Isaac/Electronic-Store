import React from 'react'
import { FaHome, FaListUl, FaRegUser, FaUser, FaList } from "react-icons/fa";
import { HiOutlineShoppingCart, HiShoppingCart } from 'react-icons/hi';
import { IoHomeOutline } from 'react-icons/io5';
import { PiListDashesLight } from 'react-icons/pi';
import { RiRobot2Line, RiRobot2Fill } from 'react-icons/ri';
import { Link, Outlet, useLocation } from 'react-router'

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col h-dvh">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      <footer className=" flex flex-col py-2 gap-1.5 transition ease-in-out min-h-20 bg-[#1A2B33] text-[#91B8C9]">
        <div className="flex items-center py-5 justify-center gap-8">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/" ? "text-white" : ""
            }`}
          >
            {location.pathname === "/" ? (
              <FaHome className="size-8" />
            ) : (
              <IoHomeOutline className="size-6 hover:size-7 transition " />
            )}
            <p>Home</p>
          </Link>
          <Link
            to="/products"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/products" ? "text-white" : ""
            }`}
          >
            {location.pathname === "/products" ? (
              <FaListUl className="size-8" />
            ) : (
              <PiListDashesLight className="size-6 hover:size-7 transition " />
            )}
            <p>Categories</p>
          </Link>
          <Link
            to="/cart"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/cart" ? "text-white" : ""
            }`}
          >
            {location.pathname === "/cart" ? (
              <HiShoppingCart className="size-8" />
            ) : (
              <HiOutlineShoppingCart className="size-6 hover:size-7 transition " />
            )}
            <p>Cart</p>
          </Link>
          <Link
            to="/ai"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/ai" ? "text-white" : ""
            }`}
          >
            {location.pathname === "/ai" ? (
              <RiRobot2Fill className="size-8" />
            ) : (
              <RiRobot2Line className="size-6 hover:size-7 transition " />
            )}
            <p>AI Assistance</p>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === "/profile" ? "text-white" : ""
            }`}
          >
            {location.pathname === "/profile" ? (
              <FaUser className="size-8" />
            ) : (
              <FaRegUser className="size-6 hover:size-7 transition " />
            )}
            <p>Profile</p>
          </Link>
        </div>

        <p className="text-center flex items-center justify-center gap-1.5">
          <span className="font-brand">Tronix</span>{" "}
          <span className="text-[11px]">
            store &copy; {new Date().getFullYear()}
          </span>
        </p>
      </footer>
    </div>
  );
}
