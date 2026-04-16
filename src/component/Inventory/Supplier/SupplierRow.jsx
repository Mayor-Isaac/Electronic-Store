import { DotsThreeVerticalIcon } from '@phosphor-icons/react';
import React from 'react';

export default function SupplierRow({ data }) {
  const { name, phone_num: phone, address, email, contact_person: contactPerson } = data;
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="grid grid-cols-[1fr_150px_1fr_1fr_220px_75px] items-center border-b border-b-[#eaeaea]">
      <div className="p-[10px] text-[14px] capitalize">{name}</div>
      <div className="p-[10px] text-[14px]">{phone}</div>
      <div className="p-[10px] text-[14px]">{address || "N/A"}</div>
      <div className="p-[10px] text-[14px] lowercase">{email || "N/A"}</div>
      <div className="p-[10px] text-[14px] capitalize">{contactPerson || "N/A"}</div>

      <div className="relative p-[10px] text-[14px] flex items-center justify-center">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
          aria-label="Open supplier actions"
        >
          <DotsThreeVerticalIcon size={20} />
        </button>

        {showMenu && (
          <div
            className="absolute top-full right-0 mt-1 w-32 rounded-md border border-[#eaeaea] bg-white shadow-md z-20"
            onMouseLeave={() => setShowMenu(false)}
          >
            <button type="button" className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f7fb]">
              Edit
            </button>
            <button type="button" className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f7fb] text-red-600">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
