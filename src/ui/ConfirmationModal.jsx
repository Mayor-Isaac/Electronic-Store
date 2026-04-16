import React from 'react'
import RedBtn from './RedBtn';
import GrayBtn from './GrayBtn';

export default function ConfirmationModal({ onConfirm, onCancel, message, mode="info", confirmText ="Yes, I'm sure", cancelText="Cancel" }) {
  return (
    <div className="bg-white rounded-2xl">
      <header
        className={`${mode === "delete" ? "bg-red-500" : "bg-blue-500"} text-white rounded-t-2xl px-5 py-3 text-3xl font-medium`}
      >
        Confirm ?
      </header>

      <p className="p-5 max-w-[400px]">
        {message}
      </p>

      <div className="flex items-center gap-4 py-3 border-t border-t-[#eaeaea] justify-end px-5">
        <RedBtn text={confirmText} onClick={onConfirm} />
        <GrayBtn text={cancelText} onClick={onCancel} />
      </div>
    </div>
  );
}
