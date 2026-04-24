import React from 'react'
// import ComingSoon from '../ui/ComingSoon';

const tabs = ["order", "cart"];
export default function OrderCart() {
  const [activeTab, setActiveTab] = React.useState("order");
  return (
    // <ComingSoon />
     <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                {tabs.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`${activeTab === item ? "text-blue-700 font-medium border-b-2 border-blue-700" : ""} text-[18px] capitalize cursor-pointer py-0.5 px-3 hover:border-b-2 border-blue-700`}
                      onClick={() => setActiveTab(item)}
                    >
                      {item}
                    </button>
                  );
                })}
                  </div>
                {activeTab === "order" && <Order />}  
                {activeTab === "cart" && <Cart />}   
            </div>
  )
}
