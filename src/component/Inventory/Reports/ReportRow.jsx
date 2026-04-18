import React from 'react'
import useFetch from '../../../hooks/useFetch';
import { getAllProducts } from '../Product/productAPI';
import { getAllSalesItems } from './reportsAPI';
import { formatDate } from '../../../utils/formatDate';
import formatCurrency from '../../../utils/formatCurrency';
import { ShoppingCartIcon } from '@phosphor-icons/react';

export default function ReportRow({ reportData }) {
    const {
      customer_name: name,
      created_at: date,
      total_amount: amount,
      payment_method: method,
      status,
      amount_paid
    } = reportData;
    const {
    data: products,
    isPending: productsLoading,
    error,
  } = useFetch({
    queryFn: getAllProducts,
    key: "products",
  });

  const { data: salesItemsRecords, isPending: salesItemsLoading } = useFetch({
    queryFn: getAllSalesItems,
    key: "salesItems",
  });
    
    const itemsBought = salesItemsRecords?.filter((item) => item.sales_record_id === reportData.id) || [];
    
  return (
    <div className="grid grid-cols-[235px_200px_1fr_190px_140px] border-b-2">
      <div className="p-[10px] text-[14px] border-r border-r-[#eaeaea]">
        {formatDate(date)}
      </div>
      <div className="p-[10px] flex gap-2 text-[14px] border-r border-r-[#eaeaea]">
        <span className=" capitalize truncate">{name}</span>
        {status && <ShoppingCartIcon size={19} weight="fill" className='text-green-500 animate-pulse' />}
      </div>
      <div className="text-[14px]">
        <div className="flex flex-col">
          {itemsBought.map((item, index) => {
            const product = products?.find(
              (prod) => prod.id === item.product_id,
            );
            return (
              <div
                key={index}
                className={`${index !== itemsBought.length - 1 ? "border-b border-b-[#eaeaea]" : ""} grid grid-cols-[1fr_150px_100px_180px] items-center`}
              >
                <div className="p-[10px] border-l-2 border-r truncate border-r-[#eaeaea]">
                  {product?.name || "Unknown Product"}
                </div>
                <div className="p-[10px] border-r border-r-[#eaeaea]">
                  {formatCurrency(item.unit_price_at_sale)}
                </div>
                <div className="p-[10px] border-r border-r-[#eaeaea]">
                  {item.quantity}
                </div>
                <div className="p-[10px] font-semibold border-r-2">
                  {formatCurrency(item.unit_price_at_sale * item.quantity)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-[10px] text-[14px] border-r border-r-[#eaeaea] font-bold">
        {formatCurrency(status ? amount_paid : amount)}
      </div>
      <div className="p-[10px] text-[14px] capitalize">
        {method || "Paystack"}
      </div>
    </div>
  );
}
