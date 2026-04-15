import React from 'react'
import { Link } from 'react-router';

export default function BlueButton({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-[8px] hover:bg-blue-700"
    >
      {text}
    </button>
  );
}
