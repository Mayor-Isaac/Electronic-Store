import React from 'react'
import { Link } from 'react-router';

export default function BlackBtn({ text, path }) {
  return (
    <div className="rounded-[8px] p-4 w-full bg-[#243D47] hover:bg-[#094663] cursor-pointer flex items-center justify-center ">
      <Link to={path}>{text}</Link>
    </div>
  );
}
