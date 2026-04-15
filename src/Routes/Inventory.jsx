import React from 'react'
import { useState } from 'react';
import Sales from '../component/Inventory/Sales/Sales';
import Upload from "../component/Inventory/Upload/Upload";
import Supplier from '../component/Inventory/Supplier/Supplier';

const tabs = ["Sales", "Upload", "Reports", "Products", "Suppliers"];
export default function Inventory() {
    const [activeTab, setActiveTab] = useState(tabs[0])
      return (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            {tabs.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`${activeTab === item ? "text-blue-700 font-medium border-b-2 border-blue-700" : ""} text-[18px] cursor-pointer py-0.5 px-3 hover:border-b-2 border-blue-700`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </button>
              );
            })}
              </div>
            {activeTab === "Sales" && <Sales />}  
            {activeTab === "Upload" && <Upload />}  
            {/* {activeTab === "Reports" && <Reports />}  
            {activeTab === "Products" && <Products />}   */}
            {activeTab === "Suppliers" && <Supplier />}  
        </div>
      );
}
