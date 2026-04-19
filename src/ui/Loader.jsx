import React from 'react'
import { FourSquare } from 'react-loading-indicators';

export default function Loader() {
  return (
    <div className="h-full min-h-[200px] flex items-center justify-center">
      {/* <FourSquare size='small' color={["#ff7e5f", "#feb47b", "#ff9a71", "#ffd0a8"]} />; */}
      <img src="/assets/logo.jpg" alt="Logo" className='animate-logo' />
    </div>
  );
}
