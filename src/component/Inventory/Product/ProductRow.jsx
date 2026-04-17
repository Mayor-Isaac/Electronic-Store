import { DotsThreeVerticalIcon, EnvelopeIcon, FileTextIcon, PhoneCallIcon } from '@phosphor-icons/react';
import React from 'react';
import Overlay from '../../../ui/Overlay';
import formatCurrency from '../../../utils/formatCurrency';
import useFetch from '../../../hooks/useFetch';
import { getAllSuppliers } from '../Supplier/supplierAPI';
import ProductDetails from './ProductDetails';

export default function ProductRow({ data }) {
  const {
    name,
    description,
    supplier_id,
    selling_price: sellingPrice,
    stock_quantity: stockQuantity,
    quantity_left: quantityLeft,
    cost_price: costPrice,
    category,
  } = data;

    const { data: suppliers, isPending, error } = useFetch({
        queryFn: () => getAllSuppliers("created_at"),
        key: "suppliers",
    });
  
  const supplier = suppliers?.find((sup) => sup.id === supplier_id) || "Unknown Supplier";
  
  const [showMenu, setShowMenu] = React.useState(false);
  const [showProductDetails, setShowProductDetails] = React.useState(false);
 

  console.log("ProductRow data===>", data);

  return (
    <div className="grid grid-cols-[80px_250px_120px_1fr_200px_130px_130px_130px_130px_75px] items-center border-b border-b-[#eaeaea]">
      <div className="p-[5px] text-[14px]">
        <img
          src={data.img_url}
          alt={data.name}
          loading="lazy"
          className="w-full h-[50px]"
          decoding="async"
        />
      </div>
      <div className="p-[10px] text-[14px] capitalize">{name}</div>
      <div className="p-[10px] text-[14px] truncate">{description || "-"}</div>
      <div className="p-[10px] text-[14px] capitalize">{category || "-"}</div>
      <div className="p-[10px] text-[14px] truncate">{supplier?.name}</div>
      <div className="p-[10px] text-[14px] font-bold">
        {formatCurrency(costPrice)}
      </div>
      <div className="p-[10px] text-[14px] font-bold">
        {formatCurrency(sellingPrice)}
      </div>
      <div className={`p-[10px] text-[14px] font-bold`}>{stockQuantity}</div>
      <div
        className={`p-[10px] text-[14px] font-bold ${quantityLeft > 50 ? "text-green-600" : quantityLeft < 50 && quantityLeft > 10 ? "text-yellow-600" : "text-red-600"}`}
      >
        {quantityLeft}
      </div>

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
            className="absolute top-full right-0 mt-1 w-[150px] px-2 py-4 flex flex-col gap-3 rounded-md border border-[#eaeaea] bg-white shadow-md z-20"
            onMouseLeave={() => setShowMenu(false)}
          >
            <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3" onClick={() => setShowProductDetails(true)}>
                    <FileTextIcon size={18} className="ml-2" />
                    <button type="button" className="cursor-pointer">
                     View Details
                    </button>
                  </div>
            <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3">
              <PhoneCallIcon size={18} className="ml-2" />
              <button type="button" className="cursor-pointer">
                <a href={`tel:${supplier?.phone_num}`}>Call Supplier</a>
              </button>
            </div>
            {supplier?.email && (
              <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3">
                <EnvelopeIcon size={18} className="ml-2" />
                <button type="button" className="cursor-pointer">
                  <a href={`mailto:${supplier?.email}`}>Email Supplier</a>
                </button>
              </div>
            )}

          </div>
        )}

        {showProductDetails && (
                <Overlay>
                    <ProductDetails product={data} supplier={supplier} closeDetails={() => setShowProductDetails(false)} />
                </Overlay>
              )}
      </div>
    </div>
  );
}
