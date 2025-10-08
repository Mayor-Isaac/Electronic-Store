import React from 'react'
import { Link } from 'react-router';
import RouteHeader from '../Components/RouteHeader';
import BlueButton from '../Components/BlueButton';
import BlackBtn from '../Components/BlackBtn';

export default function NotFound() {
  return (
    <div className=" flex flex-col gap-5 h-screen py-8 px-6">
      <RouteHeader title={"Page Not Found"} />
      <h2 className="py-5 font-bold text-center text-[28px]">
        Oops! The page you're looking for doesn't exist.
      </h2>

      <p className="text-[16px] text-center">
        We couldn't find the page you requested. Please check the URL or use the
        options below to navigate back to our site.
      </p>

      <section className="flex flex-col gap-5 py-5 font-bold text-[14px] ">
        <BlueButton text={"Go to Home"} path={"/"} />
        <BlueButton text={"View All Products"} path={"/products"} />
        <BlackBtn text={"Search for Components"} path={"/product"} />
      </section>
    </div>
  );
}
