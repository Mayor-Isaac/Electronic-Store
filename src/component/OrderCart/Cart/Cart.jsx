import React from "react";
import { getAdminLiveCarts } from "./cartAPI";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import Pagination from "../../../ui/Pagination";
import Loader from "../../../ui/Loader";
import EmptyTable from "../../../ui/EmptyTable";
import CartRow from "./CartRow";
import { XIcon } from "@phosphor-icons/react";

export default function Cart() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("created_at");
  const [page, setPage] = useState(0);

  const {
    data,
    error,
    isPending: isLoading,
  } = useFetch({
    queryFn: getAdminLiveCarts,
    key: "adminLiveCarts",
  });

  const { data: carts, count: totalCount } = data || {};

  const sortedData =
    carts &&
    [...carts]?.sort((a, b) => {
      if (sortOption === "name") {
        return a.customer_name.localeCompare(b.customer_name);
      }
      if (sortOption === "created_at") {
        return new Date(b.last_active) - new Date(a.last_active);
      }
      if (sortOption === "cart_value_asc") {
        return a.total_cart_value - b.total_cart_value;
      }
      if (sortOption === "cart_value_desc") {
        return b.total_cart_value - a.total_cart_value;
      }
      if (sortOption === "cart_item_qty_asc") {
        return a.total_items_count - b.total_items_count;
      }
      if (sortOption === "cart_item_qty_desc") {
        return b.total_items_count - a.total_items_count;
      }
      return 0;
    });

  const searchData =
    sortedData && searchTerm === ""
      ? sortedData
      : sortedData?.filter(
          (data) =>
            data.customer_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            data.customer_id.toLowerCase().includes(searchTerm.toLowerCase()),
        );

  console.log(carts);

  return (
    <div className="flex flex-col gap-5 py-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-3xl">Carts</h2>
          <input
            type="text"
            placeholder="Search customer name or receipt id...."
            className="focus:outline-none border border-[#eaeaea] w-[300px] rounded-[8px] py-2 px-3 "
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
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <h3 className="">Sort By: </h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-[#eaeaea] rounded-[8px] py-2 px-3 focus:outline-none"
            >
              <option value="created_at">Date Modified</option>
              <option value="name">Customer Name</option>
              <option value="cart_value_asc">Cart Value (asc)</option>
              <option value="cart_value_desc">Cart Value (desc)</option>
              <option value="cart_item_qty_asc">Quantity (asc)</option>
              <option value="cart_item_qty_desc">Quantity (desc)</option>
            </select>
          </div>
        </div>
      </header>
      <div>
        <div className="grid grid-cols-[235px_200px_1fr_190px_140px_80px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
          {[
            "Customer Name",
            "Date Modified",
            "Item(s) Details",
            "Cart Value",
            "Number of Items",
            "Action",
          ].map((item, index) => {
            return (
              <div key={index} className="p-[10px] text-[14px] font-bold">
                {item}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-[235px_200px_1fr_180px_190px_140px_80px] items-center border-b-2 border-t border-t-[#eaeaea]">
          {["", "", "Product Name", "Quantity", ""].map((item, index) => {
            return (
              <div
                key={index}
                className={`${index === 2 || index === 3 ? "bg-[#E8EFF9]" : ""} p-[10px] text-[14px] font-bold`}
              >
                {item}
              </div>
            );
          })}
        </div>
        {isLoading ? (
          <Loader />
        ) : searchData.length === 0 ? (
          <EmptyTable
            info="No record found"
            instruction={
              carts.length !== 0
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Make sales to generate report"
            }
          />
        ) : (
          searchData.map((cart) => <CartRow key={cart.id} cartData={cart} />)
        )}
      </div>
      {/* Pagination Controls */}
      {data && searchData.length > 10 && (
        <Pagination setPage={setPage} page={page} totalCount={totalCount} />
      )}
    </div>
  );
}
