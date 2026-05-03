import React from "react";
import useFetch from "../../../hooks/useFetch";
import { getAllReports } from "./reportsAPI";
import EmptyTable from "../../../ui/EmptyTable";
import Loader from "../../../ui/Loader";
import ReportRow from "./ReportRow";
import { XIcon } from "@phosphor-icons/react";
import Pagination from "../../../ui/Pagination";

export default function Report() {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [filterOption, setFilterOption] = React.useState("all");
  const [sortOption, setSortOption] = React.useState("created_at");
  const [page, setPage] = React.useState(0);

  const { data, isPending: isLoading } = useFetch({
    queryFn: () => getAllReports(page),
    key: [  "reports", page],
  });

  const {data: reports, count: totalCount} = data || {};

  const filteredRecords =
    filterOption === "all"
      ? reports
      : filterOption === "walk-in"
        ? reports.filter((report) => report.record_type === "Sale")
        : reports.filter((report) => report.record_type === "Order");

  const sortedRecords = filteredRecords && [...filteredRecords]?.sort((a, b) => {
    if (sortOption === "name") {
      return a.customer_name.localeCompare(b.customer_name);
    }
    if (sortOption === "created_at") {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sortOption === "amount_paid_asc") {
      return a.total_amount - b.total_amount;
    }
    if (sortOption === "amount_paid_desc") {
      return b.total_amount - a.total_amount;
    }
    return 0;
  })

  const searchedRecords =
    sortedRecords && searchTerm === ""
      ? sortedRecords
      : sortedRecords?.filter((record) =>
          record.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );


  return (
    <div className="flex flex-col gap-5 py-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-3xl">Sales Report</h2>
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
            <h3 className="">Filter: </h3>
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="border border-[#eaeaea] rounded-[8px] py-2 px-3 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="walk-in">Walk-in</option>
              <option value="order">Order</option>
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
              <option value="amount_paid_asc">Amount Paid (asc)</option>
              <option value="amount_paid_desc">Amount Paid (desc)</option>
            </select>
          </div>
        </div>
      </header>
      <div>
        <div className="grid grid-cols-[235px_200px_1fr_190px_140px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
          {[
            "Date",
            "Customer Name",
            "Item(s) Details",
            "Total Amount Paid",
            "Payment Method",
          ].map((item, index) => {
            return (
              <div key={index} className="p-[10px] text-[14px] font-bold">
                {item}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-[235px_200px_1fr_150px_100px_180px_190px_140px]  items-center border-b-2 border-t border-t-[#eaeaea]">
          {["", "", "Product Name", "Unit Price", "Quantity", "Total", ""].map(
            (item, index) => {
              return (
                <div
                  key={index}
                  className={`${index === 2 || index === 3 || index === 4 || index === 5 ? "bg-[#E8EFF9]" : ""} p-[10px] text-[14px] font-bold`}
                >
                  {item}
                </div>
              );
            },
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : searchedRecords.length === 0 ? (
          <EmptyTable
            info="No record found"
            instruction={
              reports.length !== 0
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Make sales to generate report"
            }
          />
        ) : (
          searchedRecords.map((record) => (
            <ReportRow key={record.id} reportData={record} />
          ))
        )}
      </div>
      {/* Pagination Controls */}
      {data && <Pagination setPage={setPage} page={page} totalCount={totalCount} />}

    </div>
  );
}
