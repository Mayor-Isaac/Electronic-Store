import React from 'react'
import SalesForm from './SalesForm';

export default function Sales() {
  
  return (
    <div>
      <h3 className="text-3xl font-medium my-4 ">Record Sales</h3>

      <div className="grid grid-cols-[45px_1fr_100px_120px_190px_190px_70px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
        {[
          "S/N",
          "Product",
          "Quantity",
          "Quantity Left",
          "Selling Price",
          "Amount",
          "Action",
        ].map((item, index) => {
          return (
            <div key={index} className="p-[10px] text-[14px] font-bold">
              {item}
            </div>
          );
        })}
      </div>
      <SalesForm />
    </div>
  );
}

