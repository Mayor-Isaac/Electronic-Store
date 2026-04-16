import React from 'react'
import UploadForm from './UploadForm';

export default function Upload() {
  return (
    <div>
      <h3 className="text-3xl font-medium my-4 ">Upload Inventory Data</h3>
      <div className="grid grid-cols-[45px_1fr_280px_120px_120px_120px_120px_190px_120px_65px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
        {[
          "S/N",
          "Name",
          "Description",
          "Stock Qty",
          "Cost Price",
          "Selling Price",
          "Category",
          "Supplier",
          "Image",
          "Action",
        ].map((item, index) => {
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
