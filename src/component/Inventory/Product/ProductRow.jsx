import { DotsThreeVerticalIcon, EnvelopeIcon, PencilIcon, PhoneCallIcon, TrashIcon } from '@phosphor-icons/react';
import React from 'react';
import Overlay from '../../../ui/Overlay';
import ConfirmationModal from '../../../ui/ConfirmationModal';
import { toast } from 'react-toastify';
import useAlter from '../../../hooks/useAlter';
import { deleteSupplier } from './supplierAPI';
import AddSupplierForm from './AddSupplierForm';
import formatCurrency from '../../../utils/formatCurrency';
import useFetch from '../../../hooks/useFetch';
import { getAllSuppliers } from '../Supplier/supplierAPI';

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
  
  const supplierName = suppliers?.find((sup) => sup.id === supplier_id)?.name || "Unknown Supplier";
  
  // const [showMenu, setShowMenu] = React.useState(false);
  // const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  // const [showEditForm, setShowEditForm] = React.useState(false);

  // const handleDeleteSupplier = useAlter({
  //   mutationFn: deleteSupplier,
  //   key: "suppliers",
  //   onSuccessCallback: () => {
  //     setShowConfirmDelete(false);
  //     toast.success(`${data.name} deleted successfully!`);
  //   },
  // });

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   handleDeleteSupplier.mutate(data.id);
  // };

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
      <div className="p-[10px] text-[14px] truncate">{supplierName}</div>
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

      {/* <div className="relative p-[10px] text-[14px] flex items-center justify-center">
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
            <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3">
              <PhoneCallIcon size={18} className="ml-2" />
              <button type="button" className="cursor-pointer">
                <a href={`tel:${phone}`}>Call Supplier</a>
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
            <div
              className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3"
              onClick={() => setShowEditForm(true)}
            >
              <PencilIcon size={18} className="ml-2" />
              <button type="button" className="cursor-pointer">
                Edit Supplier
              </button>
            </div>
            <div
              className="flex items-center cursor-pointer text-red-600 hover:font-medium transition ease-in-out gap-3"
              onClick={() => setShowConfirmDelete(true)}
            >
              <TrashIcon size={18} className="ml-2" />
              <button type="button" className="cursor-pointer">
                Delete Supplier
              </button>
            </div>
          </div>
        )}

        {showConfirmDelete && (
          <Overlay>
            <ConfirmationModal
              message="Are you sure you want to delete this supplier?"
              mode="delete"
              onConfirm={handleDelete}
              onCancel={() => setShowConfirmDelete(false)}
            />
          </Overlay>
        )}

        {showEditForm && (
          <Overlay>
            <AddSupplierForm
              closeForm={() => setShowEditForm(false)}
              supplierData={data}
              mode="edit"
            />
          </Overlay>
        )}
      </div> */}
    </div>
  );
}
