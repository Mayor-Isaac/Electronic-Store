import React from 'react'

export default function GreenBtn({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 cursor-pointer text-white py-2 px-4 rounded-[8px] hover:bg-green-700"
    >
      {text}
    </button>
  );
}
