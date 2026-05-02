import React from 'react'
import formatCurrency from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import { getAllProducts } from '../../Inventory/Product/productAPI';
import useFetch from '../../../hooks/useFetch';
import { getAllSalesItems } from '../../Inventory/Reports/reportsAPI';
import { DotsThreeVerticalIcon, EnvelopeIcon, PencilIcon, PhoneCallIcon, TrashIcon } from '@phosphor-icons/react';

export default function OrderRow({ data }) {
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
    const [showEditForm, setShowEditForm] = React.useState(false);
    const {id: orderId,
            created_at: dateOrdered,
            customer_name: customerName,
            status,
    total_amount: amountPaid } = data
  
  const { data: products } = useFetch({
        queryFn: getAllProducts,
        key: "products",
  });
  
  const { data: salesItems } = useFetch({
        queryFn: getAllSalesItems,
        key: "salesItems",
  });

  const itemsOrdered = salesItems?.filter((item) => item.sales_record_id === orderId);
    
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
                {itemsOrdered?.map((item, index) => {
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
      <div className="p-[10px] text-[14px] flex items-start justify-center">
              <div className="relative inline-flex">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowMenu((prev) => !prev)}
                  aria-label="Open supplier actions"
                >
                  <DotsThreeVerticalIcon className='' size={20} />
                </button>
        
                {showMenu && (
                  <div
                    className="absolute top-full right-0 mt-1 w-[150px] px-2 py-4 flex flex-col gap-3 rounded-md border border-[#eaeaea] bg-white shadow-md z-20"
                    onMouseLeave={() => setShowMenu(false)}
                  >
                    <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3">
                      <PhoneCallIcon size={18} className="ml-2" />
                      <button type="button" className="cursor-pointer">
                        <a href={`tel:`}>Call Customer</a>
                      </button>
                    </div>
                    {/* {email && (
                      <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3">
                        <EnvelopeIcon size={18} className="ml-2" />
                        <button type="button" className="cursor-pointer">
                          <a href={`mailto:`}>Email Supplier</a>
                        </button>
                      </div>
                    )} */}
                    <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3" onClick={() => setShowEditForm(true)}>
                      <PencilIcon size={18} className="ml-2" />
                      <button type="button" className="cursor-pointer">
                        Edit Status
                      </button>
                    </div>
                    <div
                      className="flex items-center cursor-pointer text-red-600 hover:font-medium transition ease-in-out gap-3"
                      onClick={() => setShowConfirmDelete(true)}
                    >
                      <TrashIcon size={18} className="ml-2" />
                      <button type="button" className="cursor-pointer">
                        Delete Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
      
              {/* {showConfirmDelete && (
                <Overlay>
                  <ConfirmationModal
                    message="Are you sure you want to delete this supplier?"
                    mode="delete"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirmDelete(false)}
                  />
                </Overlay>
              )} */}
      
              {/* {showEditForm && (
                <Overlay>
                    <AddSupplierForm closeForm={() => setShowEditForm(false)} supplierData={data} mode="edit" />
                </Overlay>
              )} */}
            </div>
    </div>
  );
}
