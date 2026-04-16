import React from 'react'
import UploadForm from './UploadForm';

export default function Upload() {
  return (
    <div>
      <h3 className="text-3xl font-medium my-4 ">Upload Inventory Data</h3>
      <div className="grid grid-cols-[45px_1fr_280px_120px_120px_120px_180px_190px_120px_65px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
        {[
          "S/N",
          "Name",
          "Description",
          "Stock Qty",
          "Cost Price",
          "Selling Price",
        ].map((item, index) => {
          return (
            <div key={index} className="p-[10px] text-[14px] font-bold">
              {item}
            </div>
          );
        })}
        <div className="p-[10px] text-[14px] font-bold flex items-center gap-4">
          Category <span className="text-blue-500 text-sm hover:underline cursor-pointer">Add Category</span>
        </div>
        {["Supplier", "Product Image", "Action"].map((item, index) => {
          return (
            <div key={index} className="p-[10px] text-[14px] font-bold">
              {item}
            </div>
          );
        })}
      </div>
      <UploadForm />
    </div>
  );
}
