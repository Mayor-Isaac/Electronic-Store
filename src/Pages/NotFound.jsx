import React from 'react'
import { TiArrowLeftOutline } from 'react-icons/ti'
import { Link, useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="text-white flex flex-col gap-5 h-full py-8 px-6 bg-[#121C21]">
      <div className="flex items-center gap-6">
        <TiArrowLeftOutline
          size={28}
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:scale-110 transition"
        />
        <h3 className="font-bold text-[18px] flex-1 text-center">
          Page Not Found
        </h3>
      </div>
      <h2 className="py-5 font-bold text-center text-[28px]">
        Oops! The page you're looking for doesn't exist.
      </h2>

      <p className="text-[16px] text-center">
        We couldn't find the page you requested. Please check the URL or use the
        options below to navigate back to our site.
      </p>

      <section className="flex flex-col gap-5 py-5 font-bold text-[14px] ">
        <div className="rounded-[8px] p-4 w-full bg-[#1294D4] hover:bg-[#0e7bb8] cursor-pointer flex items-center justify-center">
          <Link className="text-center" to="/">
            Go to Homepage
          </Link>
        </div>
        <div className="rounded-[8px] p-4 w-full bg-[#243D47] hover:bg-[#094663] cursor-pointer flex items-center justify-center">
          <Link className="text-center" to="/">
            View All Products
          </Link>
        </div>
        <div className="rounded-[8px] p-4 w-full bg-[#243D47] hover:bg-[#094663] cursor-pointer flex items-center justify-center ">
          <Link to="/">Search for Components</Link>
        </div>
      </section>
    </div>
  );
}
