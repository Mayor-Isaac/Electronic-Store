import { TrashIcon } from '@phosphor-icons/react';
import React from 'react'
import { useState } from 'react'
import useAlter from '../../../hooks/useAlter';
import useFetch from '../../../hooks/useFetch';
import { toast } from 'react-toastify';
import { getAllSuppliers } from '../Supplier/supplierAPI';
import { getAllProducts } from '../Product/productAPI';
import { createItems } from './salesAPI';

const emptyItem = {
  product_id: "",
  quantity: "",
  unit_price_sale: "",
  name: "",
};

export default function SalesForm() {
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [activeRowIndex, setActiveRowIndex] = useState(null);

    const {
      data: products,
      isPending,
      error,
    } = useFetch({
      queryFn: getAllProducts,
      key: "products",
    });

    const matchedProducts = (products ?? []).filter((product) =>
      product.name.toLowerCase().includes(productQuery.toLowerCase()),
  );
  
  const handleProductSelect = (product, index) => {
    const newItems = [...items];
    newItems[index].product_id = product.id;
    newItems[index].name = product.name;
    newItems[index].unit_price_sale = product.selling_price;
    setItems(newItems);
    setProductQuery("");
    setActiveRowIndex(null);
  }
  
 const grandTotal = items.reduce(
   (sum, item) =>
     sum + (Number(item.quantity) || 0) * (Number(item.unit_price_sale) || 0),
   0,
  );
  
  const createItemMutation = useAlter({
    mutationFn: createItems,
    key: "sales_items",
    onSuccessCallback: () => {
      toast.success("Sale recorded successfully!");
      setItems([{ ...emptyItem }]);
      setCustomerName("");
      setPaymentMethod("");
    }

  });
  
  const handleSubmit = (e) => {
    e.preventDefault();


    const salesItemsData = items.map((item) => ({
      product_id: item.product_id,
      quantity: Number(item.quantity),
      unit_price_at_sale: Number(item.unit_price_sale),
    }));

    createItemMutation.mutate(salesItemsData);

    // try {
    //   for (const product of products) {
    //     let img_url = "";

    //     if (product.image_file) {
    //       img_url = await uploadProductImage(product.image_file);
    //     }

    //     const { image_file, image_name, ...productData } = product;
    //     await productMutation.mutateAsync({
    //       ...productData,
    //       stock_quantity: Number(productData.stock_quantity),
    //       cost_price: Number(productData.cost_price),
    //       selling_price: Number(productData.selling_price),
    //       img_url,
    //       quantity_left: Number(productData.stock_quantity),
    //     });
    //   }

    //   setProducts([{ ...emptyItem }]);
    // } catch (err) {
    //   toast.error("Upload failed: " + err.message);
    // }
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {items.map((product, i) => (
        <div
          key={i}
          className="grid grid-cols-[45px_1fr_100px_190px_190px_70px] items-center border-b border-b-[#eaeaea] "
        >
          <div className="p-[10px] text-[14px] text-center border-r border-r-[#eaeaea] focus:outline-none">
            {i + 1}
          </div>
          {/* Name */}
          <div className="relative">
            {activeRowIndex === i && productQuery && (
              <ProductListModal
                index={i}
                onSelect={handleProductSelect}
                data={matchedProducts}
              />
            )}
            <input
              type="text"
              placeholder="Search product name..."
              required
              value={items[i].name}
              onFocus={() => setActiveRowIndex(i)}
              onChange={(e) => {
                const newItems = [...items];
                newItems[i].name = e.target.value;
                setItems(newItems);
                setProductQuery(e.target.value);
                setActiveRowIndex(i);
              }}
              className="p-[10px] text-[14px] w-full border-r border-r-[#eaeaea] focus:outline-none"
            />
          </div>
          <input
            type="number"
            placeholder="0"
            min={0}
            value={items[i].quantity}
            onChange={(e) => {
              const newItems = [...items];
              newItems[i].quantity = Number(e.target.value);
              newItems[i].total =
                (Number(e.target.value) || 0) *
                (Number(items[i].unit_price_sale) || 0);
              setItems(newItems);
            }}
            className="p-[10px] text-[14px] w-full border-r border-r-[#eaeaea] focus:outline-none"
          />

          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="0.00"
            required
            value={items[i].unit_price_sale}
            onChange={(e) => {
              const newItems = [...items];
              newItems[i].unit_price_sale = e.target.value;
              // newItems[i].total = (Number(items[i].quantity) || 0) * (Number(e.target.value) || 0);
              setItems(newItems);
            }}
            className="p-[10px] text-[14px]  border-r border-r-[#eaeaea] focus:outline-none"
          />
          <input
            type="number"
            readOnly
            placeholder="0.00"
            value={items[i].total ? items[i].total.toFixed(2) : "0.00"}
            className="p-[10px] text-[14px]  border-r border-r-[#eaeaea] focus:outline-none"
          />

          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {
              const newItems = items.filter((_, index) => index !== i);
              setItems(newItems);
            }}
          >
            <TrashIcon className="text-red-600 hover:text-red-500 transition text-[20px] hover:text-[22px] ease-in-out" />
          </div>
        </div>
      ))}

      {grandTotal > 0 && (
        <div className="grid grid-cols-[1fr_1fr_190px_190px_70px] items-center py-2.5 border-b border-b-[#eaeaea] ">
          <div className="px-3 flex items-center gap-3">
            <h2 className=" font-semibold text-3xl">Customer Name:</h2>
            <input
              type="text"
              placeholder="Enter customer name... (Optional)"
              className='w-full flex-1 focus:outline-none border border-[#eaeaea] rounded-[8px] py-2 px-3'
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
              }} />
          </div>
          <div className="px-3 flex items-center gap-3">
            <h2 className=" font-semibold text-3xl">Payment Method <span className="text-red-600">*</span> :</h2>
            <select
              value={paymentMethod}
              required
              className="w-fit p-2 border border-[#eaeaea] rounded-[8px] focus:outline-none"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                
              }}
            >
              <option value="">Select payment method</option>
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
              <option value="card">Card</option>
            </select>
          </div>
          {["Grand Total", grandTotal.toFixed(2), ""].map((item, index) => {
            return (
              <div key={index} className="px-3 font-semibold text-3xl">
                {item}{" "}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-end m-5 gap-5">
        <button
          type="button"
          onClick={() => setItems([...items, { ...emptyItem }])}
          className="bg-blue-500 cursor-pointer w-[100px] text-white py-2 px-4 rounded-[8px] hover:bg-blue-700"
        >
          Add Row
        </button>
        <button
          type="button"
          className="bg-blue-500 cursor-pointer w-fit text-white py-2 px-4 rounded-[8px] hover:bg-blue-700"
        >
          Generate Receipt
        </button>
        <button
          type="submit"
          className="bg-green-500 cursor-pointer w-[100px] text-white py-2 px-4 rounded-[8px] hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}


const ProductListModal = ({ data, onSelect, index }) => {
  const list = data ?? [];

  return (
    <div className="absolute bg-white z-10 min-w-[150px] left-2 top-[110%] shadow border border-[#eaeaea] rounded-[8px] py-2">
      {list.map((item, i) => (
        <div
          key={item.id}
          className={`py-2 px-4 hover:bg-gray-100 ${i !== list.length - 1 ? 'border-b border-b-[#eaeaea]' : ''} cursor-pointer`}
          onClick={() => onSelect(item, index)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}