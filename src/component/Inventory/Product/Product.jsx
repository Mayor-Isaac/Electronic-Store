import React from 'react'
import Overlay from '../../../ui/Overlay'
import BlueButton from '../../../ui/BlueButton';
import EmptyTable from '../../../ui/EmptyTable';
import Loader from '../../../ui/Loader';
import useFetch from '../../../hooks/useFetch';
import { toast } from 'react-toastify';
import { XIcon } from '@phosphor-icons/react';
import ProductRow from './ProductRow';
import { getAllProducts } from "./productAPI";

export default function Products() {
  const [showForm, setShowForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOption, setSortOption] = React.useState("created_at_desc");

  // Fetch products data using custom hook
  const {
    data: products,
    isPending,
    error,
  } = useFetch({
    queryFn: () => getAllProducts(sortOption),
    key: "products",
  });
  if (error) return toast.error("Error fetching products: " + error.message);


  return (
    <div className="p-5 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-3xl">Product List</h2>
          <input
            type="text"
            placeholder="Search product name...."
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
              <option value="created_at_desc">Date Added</option>
              <option value="quantity_left_asc">Quantity Left (asc)</option>
              <option value="quantity_left_desc">Quantity Left (desc)</option>
            </select>
          </div>
          {/* <BlueButton
            icon={"Plus"}
            text={"Add Supplier"}
            onClick={() => setShowForm(true)}
          /> */}
        </div>
      </header>
      <p>
        Total number of products:{" "}
        <span className="font-medium">{products && products.length}</span>
      </p>

      {/* Table Content */}
      <div className="table-container">
        <div className="grid grid-cols-[80px_250px_120px_1fr_200px_130px_130px_130px_130px_75px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
          {[
            "",
            "Name",
            "Description",
            "Category",
            "Supplier",
            "Cost Price",
            "Selling Price",
            "Stock Quantity",
            "Quantity Left",
            "Action",
          ].map((item, index) => {
            return (
              <div
                key={index}
                className="p-[10px] text-[14px] font-bold"
              >
                {item}
              </div>
            );
          })}
        </div>


        {isPending ? (
        <Loader />
        ) : products.length === 0 ? (
          <EmptyTable
            info="No products found"
            instruction="Upload products to get started"
          />
        ) : (
          products
            .sort((a, b) => {
              if (sortOption === "name") {
                return a.name.localeCompare(b.name);
              }
              if (sortOption === "created_at_desc") {
                return new Date(b.created_at) - new Date(a.created_at);
              }
              if (sortOption === "quantity_left_asc") {
                return a.quantity_left - b.quantity_left;
              }
              if (sortOption === "quantity_left_desc") {
                return b.quantity_left - a.quantity_left;
              }
              return 0;
            })
            .filter((products) =>
              products.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((products) => <ProductRow key={products.id} data={products} />)
        )}
      </div>
      {/* {showForm && (
        <Overlay>
          <AddSupplierForm closeForm={() => setShowForm(false)} />
        </Overlay>
      )} */}
    </div>
  );
}
