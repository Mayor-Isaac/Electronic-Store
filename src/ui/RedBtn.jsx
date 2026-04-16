import React from 'react'

export default function RedBtn({ onClick, text }) {
  return (
    <button onClick={onClick} className="bg-red-500 min-w-[100px] cursor-pointer text-white py-2 px-4 rounded-[8px] hover:bg-red-700">
      {text}
    </button>
  )
}
