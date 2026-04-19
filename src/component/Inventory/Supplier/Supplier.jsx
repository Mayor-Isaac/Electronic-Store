import React from 'react'
import Overlay from '../../../ui/Overlay'
import BlueButton from '../../../ui/BlueButton';
import EmptyTable from '../../../ui/EmptyTable';
import Loader from '../../../ui/Loader';
import SupplierRow from './SupplierRow';
import AddSupplierForm from './AddSupplierForm';
import useFetch from '../../../hooks/useFetch';
import { getAllSuppliers } from './supplierAPI';
import { toast } from 'react-toastify';
import { XIcon } from '@phosphor-icons/react';

export default function Supplier() {
  const [showForm, setShowForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOption, setSortOption] = React.useState("created_at");
  
  // Fetch suppliers data using custom hook
  const { data: suppliers, isPending, error } = useFetch({
    queryFn: () => getAllSuppliers(sortOption),
    key: "suppliers",
  });
  if (error) return toast.error("Error fetching suppliers: " + error.message)
  

  return (
    <div className="p-5 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-3xl">Supplier List</h2>
          <input
            type="text"
            placeholder="Search supplier name...."
            className="focus:outline-none border border-[#eaeaea] rounded-[8px] py-2 px-3 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <XIcon
              weight="bold"
              className="cursor-pointer text-[15px] transition ease-in-out"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <h3 className="">Sort By: </h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-[#eaeaea] rounded-[8px] py-2 px-3 focus:outline-none"
            >
              <option value="name">Name</option>
              <option value="created_at">Date Added</option>
            </select>
          </div>
          <BlueButton
            icon={"Plus"}
            text={"Add Supplier"}
            onClick={() => setShowForm(true)}
          />
        </div>
      </header>
      <p>
        Total number of suppliers:{" "}
        <span className="font-medium">{suppliers && suppliers.length}</span>
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

        {isPending ? (
          <Loader />
        ) : suppliers.length === 0 ? (
          <EmptyTable
            info="No suppliers found"
            instruction="Add suppliers to get started"
          />
        ) : (
          suppliers
            .sort((a, b) => {
              if (sortOption === "name") {
                return a.name.localeCompare(b.name);
              }
              if (sortOption === "created_at") {
                return new Date(b.created_at) - new Date(a.created_at);
              }
              return 0;
            })
            .filter((supplier) =>
              supplier.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((supplier) => (
              <SupplierRow key={supplier.id} data={supplier} />
            ))
        )}
      </div>
      {showForm && (
        <Overlay>
          <AddSupplierForm closeForm={() => setShowForm(false)} />
        </Overlay>
      )}
    </div>
  );
}
