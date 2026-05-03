import { DotsThreeVerticalIcon, EnvelopeIcon, PhoneCallIcon } from '@phosphor-icons/react';
import React from 'react'
import { getTimeDiff } from '../../../utils/getTimeDiff';

export default function CartRow({ cartData }) {
    const [showMenu, setShowMenu] = React.useState(false);
    console.log("cartData ===>", cartData);
    const {
      id,
      customer_name: customerName,
      phone_num: phoneNumber,
      email,
      last_active: dateModified,
      total_cart_value: cartValue,
      total_items_count: numberOfItems,
    } = cartData;
  return (
    <div className="grid grid-cols-[235px_200px_1fr_190px_140px_80px]  items-center">
      <h3 className="p-[10px] text-[14px]">{customerName}</h3>
      <h3 className="p-[10px] text-[14px]">{getTimeDiff(dateModified)}</h3>
      <div className="p-[10px] text-[14px] flex items-start justify-center">
        <div className="relative inline-flex">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Open supplier actions"
          >
            <DotsThreeVerticalIcon className="" size={20} />
          </button>

          {showMenu && (
            <div
              className="absolute top-full right-0 mt-1 w-[150px] px-2 py-4 flex flex-col gap-3 rounded-md border border-[#eaeaea] bg-white shadow-md z-20"
              onMouseLeave={() => setShowMenu(false)}
            >
              <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3">
                <PhoneCallIcon size={18} className="ml-2" />
                <button type="button" className="cursor-pointer">
                  <a href={`tel:${phoneNumber}`}>Call Customer</a>
                </button>
              </div>
              {email && (
                <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3">
                  <EnvelopeIcon size={18} className="ml-2" />
                  <button type="button" className="cursor-pointer">
                    <a href={`mailto:${email}`}>Email Supplier</a>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
