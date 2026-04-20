import React from 'react'

export default function Loader({size = 'small'}) {
  return (
    <div className="h-full min-h-[200px] flex items-center justify-center">
      <img
        src="/assets/loading-logo.jpg"
        alt="Logo"
        className={`animate-logo  ${size === "small" ? "w-90" : "w-150"} h-auto object-cover`}
      />
    </div>
  );
}
