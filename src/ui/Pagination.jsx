import React from 'react'

export default function Pagination({setPage, page, totalCount}) {
  return (
    <div className="flex ml-auto border w-fit rounded-[8px] px-5 py-2 bg-[#fff] gap-2">
        {/* <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="flex items-center">
          Page {page + 1} of {Math.ceil(totalCount / 10)}
        </span>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === Math.ceil(totalCount / 10) - 1}
        >
          Next
        </button> */}
      </div>
  )
}
