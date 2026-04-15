import React from 'react'

export default function GrayBtn({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-500 cursor-pointer text-white py-2 px-4 rounded-[8px] hover:bg-gray-700"
    >
      {text}
    </button>
  );
}
