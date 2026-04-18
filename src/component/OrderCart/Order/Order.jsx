import { XIcon } from '@phosphor-icons/react';
import React from 'react'
import { useState } from 'react';
import EmptyTable from '../../../ui/EmptyTable';
import OrderRow from './OrderRow';
import useFetch from '../../../hooks/useFetch';
import { getOrderRecord } from './orderAPI';
import Spinner from '../../../ui/Spinner';

export default function Order() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOption, setSortOption] = useState("created_at");
    const [filterOption, setFilterOption] = useState("all");

    const {
      data: orderData,
      isPending,
      error,
    } = useFetch({
      queryFn: getOrderRecord,
      key: "orderRecord",
    });

    const filteredData = filterOption === "all" ? orderData : filterOption === "delivered" ? orderData?.filter((order) => order.status === "delivered") : filterOption === "pending" ? orderData?.filter((order) => order.status === "pending") : orderData?.filter((order) => order.status === "cancelled");

    const sortedData = filteredData && [...filteredData]?.sort((a, b) => {
         if (sortOption === "name") {
           return a.customer_name.localeCompare(b.customer_name);
         }
         if (sortOption === "created_at") {
           return new Date(b.created_at) - new Date(a.created_at);
         }
         if (sortOption === "amount_paid_asc") {
           return a.amount_paid - b.amount_paid;
         }
         if (sortOption === "amount_paid_desc") {
           return b.amount_paid - a.amount_paid;
         }
         return 0;
    })

    const searchData =
      sortedData && searchTerm === ""
        ? sortedData
        : sortedData?.filter(
            (data) =>
              data.customer_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              data.id
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
          );


  return (
    <div className="p-5 flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-3xl">Order List</h2>
          <input
            type="text"
            placeholder="Search customer name or order id...."
            className="focus:outline-none border w-[300px] border-[#eaeaea] rounded-[8px] py-2 px-3 "
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
            <h3 className="">Filter By: </h3>
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="border border-[#eaeaea] rounded-[8px] py-2 px-3 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="delivered" className="text-green-500">
                Delivered
              </option>
              <option value="pending" className="text-yellow-500">
                Pending
              </option>
              <option value="cancelled" className="text-red-500">
                Cancelled
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="">Sort By: </h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-[#eaeaea] rounded-[8px] py-2 px-3 focus:outline-none"
            >
              <option value="created_at">Date Added</option>
              <option value="name">Name</option>
              <option value="amount_paid_asc">Amount (asc)</option>
              <option value="amount_paid_desc">Amount (desc)</option>
            </select>
          </div>
        </div>
      </header>
      <div className="flex items-center gap-5">
        <p className="font-medium">
          Total:
          <span className="font-semibold ml-2">
            {orderData && orderData.length}
          </span>
        </p>
        <p className="font-medium">
          Delivered:
          <span className="font-semibold text-green-600 ml-2">
            {orderData &&
              orderData.filter((order) => order.status === "delivered").length}
          </span>
        </p>
        <p className="font-medium">
          Pending:
          <span className="font-semibold text-yellow-600 ml-2">
            {orderData &&
              orderData.filter((order) => order.status === "pending").length}
          </span>
        </p>
        <p className="font-medium">
          Cancelled:
          <span className="font-semibold text-red-600 ml-2">
            {orderData &&
              orderData.filter((order) => order.status === "cancelled").length}
          </span>
        </p>
      </div>

      {/* Table Content */}
      <div className="table-container">
        <div className="grid grid-cols-[220px_235px_170px_1fr_150px_110px_75px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
          {[
            "Order ID",
            "Date Ordered",
            "Customer Name",
            "Items Ordered",
            "Total Amount",
            "Status",
            "Action",
          ].map((item, index) => {
            return (
              <div key={index} className="p-[10px] text-[14px] font-bold">
                {item}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-[220px_235px_170px_1fr_100px_100px_100px_150px_110px_75px] items-center border-b-2 border-t border-t-[#eaeaea]">
          {[
            "",
            "",
            "",
            "Product Name",
            "Unit Price",
            "Quantity",
            "Total",
            "",
            "",
            "",
          ].map((item, index) => {
            return (
              <div
                key={index}
                className={`${index === 6 || index === 3 || index === 4 || index === 5 ? "bg-[#E8EFF9]" : ""} p-[10px] text-[14px] font-bold`}
              >
                {item}
              </div>
            );
          })}
        </div>
        {isPending ? (
          <Spinner />
        ) : error ? (
          <div className="text-center text-red-500 py-4">
            Error fetching order data
          </div>
        ) : searchData.length === 0 ? (
          <EmptyTable
            info={"No Order found"}
            instruction={
              orderData.length !== 0
                ? "Kindly adjust search or filter option"
                : "Orders will show when customers checkouts"
            }
          />
        ) : (
          searchData.map((data) => <OrderRow data={data} />)
        )}
      </div>
    </div>
  );
}
