import React from 'react'
import Overlay from '../../../ui/Overlay'
import BlueButton from '../../../ui/BlueButton';
import EmptyTable from '../../../ui/EmptyTable';
import SupplierRow from './SupplierRow';
import AddSupplierForm from './AddSupplierForm';
import useFetch from '../../../hooks/useFetch';
import { getAllSuppliers } from './supplierAPI';
import { toast } from 'react-toastify';

export default function Supplier() {
  const [showForm, setShowForm] = React.useState(false);
  
  // Fetch suppliers data using custom hook
  const { data: suppliers, isPending, error } = useFetch({
    queryFn: getAllSuppliers,
    key: "suppliers",
  });

 if(isPending) return <p>Loading...</p>
 if(error) return toast.error("Error fetching suppliers: " + error.message)

  return (
    <div className="p-5 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-3xl">Supplier List</h2>
          <input
            type="text"
            placeholder="Search supplier name...."
            className="focus:outline-none border border-[#eaeaea] rounded-[8px] py-2 px-3 "
          />
        </div>
        <BlueButton
          icon={"Plus"}
          text={"Add Supplier"}
          onClick={() => setShowForm(true)}
        />
      </header>
      <p>
        Total number of suppliers: <span className="font-medium">{suppliers.length}</span>
      </p>

      {/* Table Content */}
      <div className="table-container">
        <div className="grid grid-cols-[1fr_150px_1fr_1fr_220px_75px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
          {[
            "Name",
            "Phone number",
            "Address",
            "Email",
            "Contact Person",
            "Action",
          ].map((item, index) => {
            return (
              <div key={index} className="p-[10px] text-[14px] font-bold">
                {item}
              </div>
            );
          })}
        </div>
        
        {isPending ? <p>Loading...</p> : suppliers.length === 0 ? <EmptyTable info="No suppliers found" instruction="Add suppliers to get started" /> : suppliers.map((supplier) => <SupplierRow key={supplier.id} data={supplier} />)}
      </div>
      {showForm && <Overlay><AddSupplierForm closeForm={() => setShowForm(false)} /></Overlay>}
    </div>
  );
}
