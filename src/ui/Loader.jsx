import React from 'react'

export default function Loader({size = 'small'}) {
  return (
    <div className="h-full min-h-[200px] flex items-center justify-center">
      <img
        src="/assets/logo.jpg"
        alt="Logo"
        className={`animate-logo  ${size === "small" ? "w-40" : "w-70"} h-auto object-cover`}
      />
    </div>
  );
}
