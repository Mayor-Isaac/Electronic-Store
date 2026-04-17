import { PlusIcon } from '@phosphor-icons/react';
import React from 'react'
import { Link } from 'react-router';

export default function BlueButton({ onClick, text, icon, type ="button" }) {
  return (
    <div className="flex items-center justify-between gap-1.5 bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-[8px] hover:bg-blue-700">
      {icon === "Plus" && <PlusIcon size={18} />}
      <button type={type} onClick={onClick} className="cursor-pointer">
        {text}
      </button>
    </div>
  );
}
