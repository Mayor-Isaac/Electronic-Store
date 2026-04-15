import React from 'react'
import RedBtn from './RedBtn';

export default function Header({setShowSignout}) {
  return (
    <div className="px-10 py-2 flex items-center justify-between fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md z-50">
      <h1 className="text-[30px] font-medium">
        Welcome,{" "}
        <span className="brand gradient-text">
          Admin
        </span>
          </h1>

          <RedBtn onClick={()=>setShowSignout(true)} text="Sign out" />
    </div>
  );
}
