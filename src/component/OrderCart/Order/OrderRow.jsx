import React from 'react'
import formatCurrency from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import { getAllProducts } from '../../Inventory/Product/productAPI';
import useFetch from '../../../hooks/useFetch';
import { getAllSalesItems } from '../../Inventory/Reports/reportsAPI';

export default function OrderRow({ data }) {
    const {id: orderId,
            created_at: dateOrdered,
            customer_name: customerName,
            status,
    amount_paid: amountPaid } = data
  
  const { data: products } = useFetch({
        queryFn: getAllProducts,
        key: "products",
  });
  
  const { data: salesItems } = useFetch({
        queryFn: getAllSalesItems,
        key: "salesItems",
  });

  const itemsOrdered = salesItems?.filter((item) => item.sales_record_id === orderId);
  
  console.log("products:", products);
    
  return (
    <div className="grid grid-cols-[220px_235px_170px_1fr_150px_110px_75px] border-b-2">
      <div className="p-[10px] text-[14px] border-r truncate border-r-[#eaeaea]">
        {orderId}
      </div>
      <div className="p-[10px] text-[14px] border-r border-r-[#eaeaea]">
        {formatDate(dateOrdered)}
      </div>
      <div className="p-[10px] text-[14px] truncate border-r border-r-[#eaeaea]">
        {customerName}
      </div>
      <div className="text-[14px]">
              <div className="flex flex-col">
                {itemsOrdered.map((item, index) => {
                  const product = products?.find(
                    (prod) => prod.id === item.product_id,
                  );
                  return (
                    <div
                      key={index}
                      className={`${index !== itemsOrdered.length - 1 ? "border-b border-b-[#eaeaea]" : ""} grid grid-cols-[1fr_130px_70px_140px] items-center`}
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
                        {formatCurrency(
                          item.unit_price_at_sale * item.quantity,
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
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
