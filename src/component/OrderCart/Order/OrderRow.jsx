import React from 'react'
import formatCurrency from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';

export default function OrderRow({ data }) {
    const {id: orderId,
            created_at: dateOrdered,
            customer_name: customerName,
            status,
        amount_paid: amountPaid } = data
    
  return (
    <div className="grid grid-cols-[220px_235px_170px_1fr_150px_110px_75px] border-b-2 items-center">
      <div className="p-[10px] text-[14px] border-r truncate border-r-[#eaeaea]">
        {orderId}
      </div>
      <div className="p-[10px] text-[14px] border-r border-r-[#eaeaea]">
        {formatDate(dateOrdered)}
      </div>
      <div className="p-[10px] text-[14px] truncate border-r border-r-[#eaeaea]">
        {customerName}
      </div>
      <div className="p-[10px] text-[14px] border-r border-r-[#eaeaea]">
        product
      </div>
      <div className="p-[10px] font-bold text-[14px] border-r border-r-[#eaeaea]">
        {formatCurrency(amountPaid)}
      </div>
      <div className="p-[10px] text-[14px] border-r border-r-[#eaeaea]">
        <span
          className={`text-[11px] py-2 px-4 rounded-full uppercase ${status === "delivered" ? "bg-green-900 text-green-100" : status === "pending" ? "bg-yellow-400 animate-pulse text-yellow-900" : "bg-red-800 text-red-100"} `}
        >
          {status}
        </span>
      </div>
      <div className="p-[10px] text-[14px]">Action</div>
    </div>
  );
}
