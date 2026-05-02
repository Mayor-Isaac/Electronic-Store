import { CaretDoubleLeftIcon, CaretDoubleRightIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import React from 'react'

export default function Pagination({setPage, page, totalCount}) {
    return (
      <div className="flex items-center ml-auto w-fit rounded-[8px] px-8 py-4 bg-[#f1f1f1] gap-5">
        <CaretDoubleLeftIcon
          size={28}
          className={`${page != 0 ? "cursor-pointer" : "cursor-not-allowed"} hover:bg-white transition ease-in-out p-2 rounded-[6px]`}
          onClick={() => setPage(0)}
        />
        <CaretLeftIcon
          size={28}
          className={`${page != 0 ? "cursor-pointer" : "cursor-not-allowed"} hover:bg-white transition ease-in-out p-2 rounded-[6px]`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        />

        {Array.from({ length: Math.ceil(totalCount / 10) }, (_, index) => {
          const isActive = page === index;

          return (
            <button
              key={index}
              disabled={isActive}
              onClick={() => setPage(index)}
              className="group relative flex h-8 w-8 items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 mx-2"
            >
              {/* The Diamond Shape (Background) */}
              <div
                className={`absolute inset-0 rotate-45 rounded-[4px] transition-colors duration-300
          ${
            isActive
              ? "bg-blue-600 border-blue-600 border-2 shadow-[0_4px_10px_rgba(139,92,246,0.4)]"
              : "bg-transparent group-hover:border-blue-600"
          }`}
              />

              {/* The Number (Kept upright) */}
              <span
                className={`relative z-10 font-light transition-colors duration-300
          ${isActive ? "text-white cursor-not-allowed " : "text-gray-600 cursor-pointer group-hover:text-blue-600"}
        `}
              >
                {index + 1}
              </span>
            </button>
          );
        })}
        <CaretRightIcon
          disabled={page === Math.ceil(totalCount / 10) - 1}
          size={28}
          className={`${page !== Math.ceil(totalCount / 10) - 1 ? "cursor-pointer" : "cursor-not-allowed"} hover:bg-white transition ease-in-out p-2 rounded-[6px]`}
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(totalCount / 10) - 1),
            )
          }
        />
        <CaretDoubleRightIcon
          size={28}
          className={`${page !== Math.ceil(totalCount / 10) - 1 ? "cursor-pointer" : "cursor-not-allowed"} hover:bg-white transition ease-in-out p-2 rounded-[6px]`}
          onClick={() => setPage(Math.ceil(totalCount / 10) - 1)}
        />
      </div>
    );
}
