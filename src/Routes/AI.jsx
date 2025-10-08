import React from 'react'
import AIContainer from '../Pages/AI/AIContainer'
import RouteHeader from '../Components/RouteHeader'

export default function AI() {
  return (
    <div className="p-5 flex flex-col gap-5 h-screen">
      <RouteHeader title="AI Assistant" />
      <div className="flex-1 overflow-auto">
        <AIContainer />
      </div>
    </div>
  );
}
