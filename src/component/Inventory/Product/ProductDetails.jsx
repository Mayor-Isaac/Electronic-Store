import React from 'react'
import formatCurrency from '../../../utils/formatCurrency';
import { XIcon } from '@phosphor-icons/react';

export default function ProductDetails({ product, closeDetails, supplier }) {
    console.log("ProductDetails product===>", product);
    console.log("ProductDetails supplier===>", supplier);
  return (
    <div className=" p-10 bg-white">
      <div className="flex items-center justify-end">
        <XIcon
          onClick={closeDetails}
          className="cursor-pointer text-[20px] hover:font-semibold transition ease-in-out "
        />
      </div>
      <div className="flex gap-15">
        {/* Image */}
        <div className="p-[5px] text-[14px] w-[350px]">
          <img
            src={product.img_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-[400px]"
            decoding="async"
          />
        </div>
        {/* Details */}
        <div className="p-[10px]  capitalize min-w-[350px] max-w-[400px] flex flex-col gap-10">
          {/* Product Information */}
          <div className="flex flex-col gap-3">
            <p className="w-fit px-1 py-0.5 text-[14px] font-bold border-b-2 border-b-[#000]">
              Product Info
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                <p className="font-bold">Name:</p>
                <p className="">{product.name}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Product Description:</p>
                <p>{product.description || "-"}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Category:</p>
                <p>{product.category || "-"}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Cost Price:</p>
                <p className="">{formatCurrency(product.cost_price)}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Selling Price:</p>
                <p className="">{formatCurrency(product.selling_price)}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Selling Price:</p>
                <p className="">{formatCurrency(product.selling_price)}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Stock Quantity:</p>
                <p className="">{product.stock_quantity}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Quantity Sold:</p>
                <p className="">
                  {product.stock_quantity - product.quantity_left}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Available Quantity:</p>
                <p className="">{product.quantity_left}</p>
              </div>
            </div>
          </div>

          {/* Supplier Information */}
          <div className="flex flex-col gap-3">
            <p className="w-fit px-1 py-0.5 text-[14px] font-bold border-b-2 border-b-[#000]">
              Supplier Info
            </p>
            <p>Supplier: {supplier?.name || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
    }
