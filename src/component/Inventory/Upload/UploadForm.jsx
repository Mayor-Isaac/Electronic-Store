import { TrashIcon } from '@phosphor-icons/react';
import React from 'react'
import { useState } from 'react'
import useAlter from '../../../hooks/useAlter';
import useFetch from '../../../hooks/useFetch';
import { createProduct, getAllCategories, uploadProductImage } from './uploadAPI';
import { toast } from 'react-toastify';
import { getAllSuppliers } from '../Supplier/supplierAPI';
import { useRef } from 'react';
import * as XLSX from "xlsx";

const emptyProduct = {
  name: "",
  description: "",
  stock_quantity: "",
  cost_price: "",
  selling_price: "",
  category: "",
  supplier_id: "",
  image_name: "",
  image_file: null,
};

export default function UploadForm() {
  const [products, setProducts] = useState([{ ...emptyProduct }]);

   const { data: suppliers, isPending:loadSupplier, error } = useFetch({
      queryFn: () => getAllSuppliers("created_at"),
      key: "suppliers",
   });
  
   const { data: categories, isPending:loadCategories } = useFetch({
      queryFn: getAllCategories,
      key: "categories",
   });
  
  const isPending = loadSupplier || loadCategories

  const uniqueCategories = React.useMemo(() => {
    if (!categories) return [];

    const categoryMap = new Map();
    categories.forEach((category) => {
      const normalizedName = category?.name?.trim().toLowerCase();
      if (!normalizedName || categoryMap.has(normalizedName)) return;
      categoryMap.set(normalizedName, category);
    });

    return Array.from(categoryMap.values());
  }, [categories]);
  

  // Mutation for creating the product
  const productMutation = useAlter({
    mutationFn: createProduct,
    key: "products",
    onSuccessCallback: () => {
      setProducts([{ ...emptyProduct }]);
      toast.success("Product uploaded successfully!");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const product of products) {
        let img_url = "";

        if (product.image_file) {
          img_url = await uploadProductImage(product.image_file);
        }

        const { image_file, image_name, ...productData } = product;
        await productMutation.mutateAsync({
          ...productData,
          stock_quantity: Number(productData.stock_quantity),
          cost_price: Number(productData.cost_price),
          selling_price: Number(productData.selling_price),
          img_url,
          quantity_left: Number(productData.stock_quantity),
        });
      }

      setProducts([{ ...emptyProduct }]);
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    }
  };

  // Excel upload handling
  const fileInputRef = useRef(null);

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      // Convert to JSON
      const data = XLSX.utils.sheet_to_json(ws);

      // Mapping Excel headers to your state keys
      const formattedData = data.map((row) => ({
        name: row["Name"],
        description: row["Description"],
        stock_quantity: row["Stock Qty"],
        cost_price: row["Cost Price"],
        selling_price: row["Selling Price"],
      }));

      setProducts(formattedData);
    };

    // reader.readAsBinaryString(file);
    reader.readAsArrayBuffer(file);
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {products.map((product, i) => (
        <div
          key={i}
          className="grid grid-cols-[45px_1fr_280px_120px_120px_120px_180px_190px_120px_65px] items-center border-b border-b-[#eaeaea] "
        >
          <div className="p-[10px] text-[14px] text-center border-r border-r-[#eaeaea] focus:outline-none">
            {i + 1}
          </div>
          <input
            type="text"
            placeholder="Type product name..."
            required
            value={products[i].name}
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].name = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] text-[14px] w-full border-r border-r-[#eaeaea] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Type short description..."
            value={products[i].description}
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].description = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] text-[14px] w-full border-r border-r-[#eaeaea] focus:outline-none"
          />
          <input
            type="number"
            min={0}
            placeholder="0"
            value={products[i].stock_quantity}
            required
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].stock_quantity = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] text-[14px]  border-r border-r-[#eaeaea] focus:outline-none"
          />
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="0.00"
            required
            value={products[i].cost_price}
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].cost_price = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] text-[14px]  border-r border-r-[#eaeaea] focus:outline-none"
          />
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="0.00"
            value={products[i].selling_price}
            required
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].selling_price = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] text-[14px]  border-r border-r-[#eaeaea] focus:outline-none"
          />
          <select
            value={products[i].category}
            required
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].category = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] capitalize text-[14px] truncate border-r border-r-[#eaeaea] focus:outline-none"
          >
            <option value="" disabled>
              {isPending ? "Loading categories..." : "Select category"}
            </option>
            {uniqueCategories.length === 0 && !isPending && (
              <option value="" disabled>
                Click Add Category to create new category
              </option>
            )}
            {uniqueCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={products[i].supplier_id}
            required
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].supplier_id = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] text-[14px] truncate border-r border-r-[#eaeaea] focus:outline-none"
          >
            <option value="" disabled>
              {isPending
                ? "Loading suppliers..."
                : error
                  ? "Failed to load suppliers"
                  : "Select supplier"}
            </option>
            {suppliers?.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          <div className="p-[10px] text-[14px] border-r border-r-[#eaeaea]">
            <input
              id={`product-image-${i}`}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                const newProducts = [...products];
                newProducts[i].image_name = file ? file.name : "";
                newProducts[i].image_file = file || null;
                setProducts(newProducts);
              }}
              className="hidden"
            />
            <label
              htmlFor={`product-image-${i}`}
              className="block w-full truncate cursor-pointer"
              title={products[i].image_name || "Upload Image"}
            >
              {products[i].image_name || "Upload Image"}
            </label>
          </div>

          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {
              const newProducts = products.filter((_, index) => index !== i);
              setProducts(newProducts);
            }}
          >
            <TrashIcon className="text-red-600 hover:text-red-500 transition text-[20px] hover:text-[22px] ease-in-out" />
          </div>
        </div>
      ))}

      <div className="flex items-center justify-end m-5 gap-5">
        <div>
          <button
            type="button"
            onClick={triggerFileSelect}
            className="bg-gray-500 cursor-pointer w-fit text-white py-2 px-4 rounded-[8px] hover:bg-gray-700"
          >
            Upload Excel File
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx, .xls, .csv"
            className="hidden"
          />
        </div>

        <button
          type="button"
          onClick={() => setProducts([...products, { ...emptyProduct }])}
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
  );
}
