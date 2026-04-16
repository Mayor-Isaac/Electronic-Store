import { DotsThreeVerticalIcon, EnvelopeIcon, PencilIcon, PhoneCallIcon, TrashIcon } from '@phosphor-icons/react';
import React from 'react';
import Overlay from '../../../ui/Overlay';
import ConfirmationModal from '../../../ui/ConfirmationModal';
import { toast } from 'react-toastify';
import useAlter from '../../../hooks/useAlter';
import { deleteSupplier } from './supplierAPI';
import AddSupplierForm from './AddSupplierForm';

export default function SupplierRow({ data }) {
  const { name, phone_num: phone, address, email, contact_person: contactPerson } = data;
  const [showMenu, setShowMenu] = React.useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [showEditForm, setShowEditForm] = React.useState(false);


   const handleDeleteSupplier = useAlter({
      mutationFn: deleteSupplier,
      key: "suppliers",
      onSuccessCallback: () => {
        setShowConfirmDelete(false);
        toast.success(`${data.name} deleted successfully!`);
      }
    });
  
      const handleDelete = (e) => {
        e.preventDefault();
        handleDeleteSupplier.mutate(data.id);
      }

  return (
    <div className="grid grid-cols-[1fr_150px_1fr_1fr_220px_75px] items-center border-b border-b-[#eaeaea]">
      <div className="p-[10px] text-[14px] capitalize">{name}</div>
      <div className="p-[10px] text-[14px]">{phone}</div>
      <div className="p-[10px] text-[14px]">{address || "-"}</div>
      <div className="p-[10px] text-[14px] lowercase">{email || "-"}</div>
      <div className="p-[10px] text-[14px] capitalize">
        {contactPerson || "-"}
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
            <div className="flex items-center cursor-pointer hover:font-medium transition ease-in-out gap-3" onClick={() => setShowEditForm(true)}>
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
              <AddSupplierForm closeForm={() => setShowEditForm(false)} supplierData={data} mode="edit" />
          </Overlay>
        )}
      </div>
    </div>
  );
}
