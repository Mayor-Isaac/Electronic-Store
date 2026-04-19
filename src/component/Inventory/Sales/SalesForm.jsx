import React from 'react';
import { TrashIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import useAlter from '../../../hooks/useAlter';
import useFetch from '../../../hooks/useFetch';
import { toast } from 'react-toastify';
import { getAllProducts } from '../Product/productAPI';
import { createItems, createSalesRecord, updateProductQty } from './salesAPI';
import SalesReceipt from './SalesReceipt';
import Overlay from '../../../ui/Overlay';
import ConfirmationModal from '../../../ui/ConfirmationModal';

const emptyItem = {
  product_id: "",
  initial_quantity_left: "",
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
  const [receiptData, setReceiptData] = useState(null);
  const [showReceiptPrompt, setShowReceiptPrompt] = useState(false);

  const { data: products } = useFetch({
      queryFn: getAllProducts,
      key: ["products", productQuery],
    });

    const matchedProducts = (products ?? []).filter((product) =>
      product.name.toLowerCase().includes(productQuery.toLowerCase()),
  );
  
  const handleProductSelect = (product, index) => {
    const newItems = [...items];
    newItems[index].product_id = product.id;
    newItems[index].name = product.name;
    newItems[index].unit_price_sale = product.selling_price;
    newItems[index].initial_quantity_left = product.quantity_left;
    setItems(newItems);
    setProductQuery("");
    setActiveRowIndex(null);
  }
  
 const grandTotal = items.reduce(
   (sum, item) =>
     sum + (Number(item.quantity) || 0) * (Number(item.unit_price_sale) || 0),
   0,
  );
  
  const reduceItemsQty = useAlter({
    mutationFn: updateProductQty,
    key: "products",
  });
  
  const createSalesMutation = useAlter({
    mutationFn: createItems,
    key: "sales_items",
  });
  
  const createSalesRecordMutation = useAlter({
    mutationFn: createSalesRecord,
    key: "sales_record",
  });

  const resetSaleForm = () => {
    setItems([{ ...emptyItem }]);
    setCustomerName("");
    setPaymentMethod("");
    setProductQuery("");
    setActiveRowIndex(null);
    setReceiptData(null);
    setShowReceiptPrompt(false);
  };

  const downloadReceiptPdf = async (data) => {
    const blob = await pdf(<SalesReceipt receiptData={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `sales-receipt-${data?.salesRecord?.id.slice(0, 13) ?? Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const handleReceiptConfirm = async () => {
    if (!receiptData) {
      resetSaleForm();
      return;
    }

    try {
      await downloadReceiptPdf(receiptData);
      toast.success('Receipt PDF downloaded.');
    } catch (error) {
      toast.error(error?.message || 'Unable to generate receipt PDF.');
      return;
    }

    resetSaleForm();
  };

  const handleReceiptCancel = () => {
    resetSaleForm();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const salesData = {
      customer_name: customerName.trim() || "Walk-in Customer",
      payment_method: paymentMethod,
      total_amount: grandTotal,
    };

    try {
      const salesRecordResponse = await createSalesRecordMutation.mutateAsync(salesData);
      const savedSalesRecord = salesRecordResponse?.[0];

      if (!savedSalesRecord) {
        throw new Error("Sales record was not created.");
      }

      const salesItemsData = items.map((item) => ({
        product_id: item.product_id,
        quantity: Number(item.quantity),
        unit_price_at_sale: Number(item.unit_price_sale),
        sales_record_id: savedSalesRecord.id,
      }));

      await createSalesMutation.mutateAsync(salesItemsData);

      const updatedProducts = items.map((item) => {
        const matchedProduct = (products ?? []).find(
          (product) => product.id === item.product_id,
        );

        return {
          product_id: item.product_id,
          quantity_left:
            (Number(matchedProduct?.quantity_left) || 0) -
            (Number(item.quantity) || 0),
        };
      });

      await reduceItemsQty.mutateAsync(updatedProducts);

      setReceiptData({
        salesRecord: savedSalesRecord,
        items: items.map((item) => ({
          name: item.name,
          quantity: Number(item.quantity),
          unit_price_at_sale: Number(item.unit_price_sale),
        })),
        customerName: customerName.trim() || "Walk-in Customer",
        paymentMethod,
        grandTotal,
      });
      setShowReceiptPrompt(true);
      toast.success("Sale recorded successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to save sale.");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      {items.map((product, i) => (
        <div
          key={i}
          className="grid grid-cols-[45px_1fr_100px_120px_190px_190px_70px] items-center border-b border-b-[#eaeaea] "
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
            max={items[i].initial_quantity_left}
            onInvalid={(e) => {
              if (e.target.validity.rangeOverflow) {
                e.target.setCustomValidity(
                  `${items[i].name} has only ${items[i].initial_quantity_left} units left in stock`,
                );
              }
            }}
            onInput={(e) => e.target.setCustomValidity("")}
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
            placeholder="0"
            readOnly
            min={0}
            value={items[i].initial_quantity_left}
            className="p-[10px] text-[14px] bg-slate-50 w-full font-bold border-r border-r-[#eaeaea] focus:outline-none"
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
            className="p-[10px] text-[14px] font-bold border-r bg-slate-50 border-r-[#eaeaea] focus:outline-none"
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
            <h2 className=" font-semibold text-2xl">Customer Name:</h2>
            <input
              type="text"
              placeholder="Enter customer name... (Optional)"
              className="w-full flex-1 focus:outline-none border border-[#eaeaea] rounded-[8px] py-2 px-3"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
              }}
            />
          </div>
          <div className="px-3 flex items-center gap-3">
            <h2 className=" font-semibold text-2xl">
              Payment Method <span className="text-red-600">*</span> :
            </h2>
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
          type="submit"
          className="bg-green-500 cursor-pointer w-[100px] text-white py-2 px-4 rounded-[8px] hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </form>
    {showReceiptPrompt && (
      <Overlay>
        <ConfirmationModal
          message="Sale saved successfully. Do you want to generate the receipt PDF now?"
          confirmText="Generate Receipt"
          cancelText="No, Thanks"
          onConfirm={handleReceiptConfirm}
          onCancel={handleReceiptCancel}
        />
      </Overlay>
    )}
    </>
  );
}


const ProductListModal = ({ data, onSelect, index }) => {
  const list = data ?? [];

  return (
    <div className="absolute bg-white z-10 min-w-[150px] left-2 top-[110%] shadow border border-[#eaeaea] rounded-[8px] py-2">
      {list.length === 0 ? (
        <div className="py-2 px-4 text-gray-500">No products found</div>
      ) : (
        list.map((item, i) => (
          <div
            key={item.id}
            className={`py-2 px-4 hover:bg-gray-100 ${i !== list.length - 1 ? 'border-b border-b-[#eaeaea]' : ''} cursor-pointer`}
            onClick={() => onSelect(item, index)}
          >
          {item.name}
        </div>
      )))}
    </div>
  );
}