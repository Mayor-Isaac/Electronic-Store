import React from 'react'

export default function Overlay({ children }) {
  return (
    <>
      <div className="fixed inset-0 z-[99] flex  items-center justify-center bg-black/20 backdrop-blur-sm rounded-[4px]">
        {children}
      </div>
    </>
  );
}
