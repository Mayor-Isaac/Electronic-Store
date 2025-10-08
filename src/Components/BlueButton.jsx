import React from 'react'
import { Link } from 'react-router';

export default function BlueButton({ text, path }) {
  return (
    <div className="rounded-[8px] p-4 w-full bg-[#1294D4] hover:bg-[#0e7bb8] cursor-pointer flex items-center justify-center">
      <Link className="text-center" to={path}>
        {text}
      </Link>
    </div>
  );
}
