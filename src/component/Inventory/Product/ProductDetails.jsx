import React from 'react'
import formatCurrency from '../../../utils/formatCurrency';
import { MapPinIcon, PhoneIcon, UserCircleIcon, XIcon } from '@phosphor-icons/react';
import { formatDate } from '../../../utils/formatDate';

export default function ProductDetails({ product, closeDetails, supplier }) {
  return (
    <div className=" p-5 rounded-[5px] bg-white">
      <div className="flex gap-15">
        {/* Image */}
        <div className="p-[5px] text-[14px] w-[350px]">
          <img
            src={product.img_url}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-[400px] object-contain bg-gray-100 rounded-md p-5"
            width="350"
            height="400"
          />
        </div>
        {/* Details */}
        <div className="p-[10px]  capitalize min-w-[350px] flex flex-col gap-10">
          {/* Product Information */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="w-fit px-1 py-0.5 text-[14px] font-bold border-b-2 border-b-[#000]">
                Product Info
              </p>
              <XIcon
                onClick={closeDetails}
                className="cursor-pointer text-[20px] hover:font-semibold transition ease-in-out "
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <p className="font-bold">Name:</p>
                <p className="">{product.name}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">Product Description:</p>
                <p>{product.description || "-"}</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="font-bold">Category:</p>
                <p>{product.category || "-"}</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex gap-1 items-center min-w-[190px]">
                  <p className="font-bold">Cost Price:</p>
                  <p className="">{formatCurrency(product.cost_price)}</p>
                </div>
                <div className="flex gap-1 items-center w-fit">
                  <p className="font-bold">Selling Price:</p>
                  <p className="">{formatCurrency(product.selling_price)}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex gap-1 items-center min-w-[190px]">
                  <p className="font-bold">Stock Quantity:</p>
                  <p className="">{product.stock_quantity}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="font-bold">Quantity Sold:</p>
                  <p className="">
                    {product.stock_quantity - product.quantity_left}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <p className="font-bold">Available Quantity:</p>
                <p
                  className={`${product.quantity_left > 50 ? "text-green-600" : product.quantity_left < 50 && product.quantity_left > 10 ? "text-yellow-600" : "text-red-600"}`}
                >
                  {product.quantity_left}
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="font-bold">Date Added:</p>
                <p className="text-[14.5px] italic">
                  {formatDate(product.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Supplier Information */}
          <div className="flex flex-col gap-3">
            <p className="w-fit px-1 py-0.5 text-[14px] font-bold border-b-2 border-b-[#000]">
              Supplier Info
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <UserCircleIcon size={20} />
                <p className="">{supplier?.name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <MapPinIcon size={20} />
                <p className="">{supplier?.address}</p>
              </div>
              <div className="flex gap-2 items-center">
                <PhoneIcon size={20} />
                <a
                  href={`tel:${supplier?.phone_num}`}
                  className="text-blue-500"
                >
                  {supplier?.phone_num}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    }
