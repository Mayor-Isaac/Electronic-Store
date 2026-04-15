import React from "react";

export default function EmptyTable({ info, instruction }) {
  return (
    <div className="mt-[80px] w-fit  mx-auto flex flex-col items-center gap-[32px] ">
      <div className="w-[150px] h-[150]">
        <img
          src="/assets/empty-job-list.png"
          alt="Empty-List"
          className="w-full h-full"
        />
      </div>
      <div className=" flex flex-col items-center gap-[6px] ">
        {info && (
          <p className="font-medium text-[20px]">{info}</p>
        )}
        {instruction && (
          <p className="text-[14px] mx-2.5 text-[#707070]">{instruction}</p>
        )}
      </div>
    </div>
  );
}

// USAGE:
// <EmptyTable info="No data" instruction="Add items to get started" />
// Shows an empty state message for tables.
