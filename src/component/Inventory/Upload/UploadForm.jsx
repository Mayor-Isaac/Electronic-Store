import { TrashIcon } from '@phosphor-icons/react';
import React from 'react'
import { useState } from 'react'
import useAlter from '../../../hooks/useAlter';
import useFetch from '../../../hooks/useFetch';
import { createProduct, uploadProductImage } from './uploadAPI';
import { toast } from 'react-toastify';
import { getAllSuppliers } from '../Supplier/supplierAPI';

const emptyProduct = {
  name: "",
  description: "",
  stock_quantity: null,
  cost_price: null,
  selling_price: null,
  category: "",
  supplier_id: "",
  image_name: "",
  image_file: null,
};

export default function UploadForm() {
  const [products, setProducts] = useState([{ ...emptyProduct }]);

   const { data: suppliers, isPending, error } = useFetch({
      queryFn: () => getAllSuppliers("created_at"),
      key: "suppliers",
    });

  // Mutation for creating the product
  const productMutation = useAlter({
    mutationFn: createProduct,
    key: "products",
    onSuccessCallback: () => toast.success("Product uploaded successfully!"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const product of products) {
        let image_url = "";

        if (product.image_file) {
          image_url = await uploadProductImage(product.image_file);
        }

        const { image_file, image_name, ...productData } = product;
        await productMutation.mutateAsync({ ...productData, image_url });
      }

      setProducts([{ ...emptyProduct }]);
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    }
  };

  console.log("Products to upload===>", products);
  console.log("Suppliers data===>", suppliers);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {products.map((product, i) => (
        <div
          key={i}
          className="grid grid-cols-[45px_1fr_280px_120px_120px_120px_120px_190px_120px_65px] items-center border-b border-b-[#eaeaea] "
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
          <input
            type="text"
            placeholder="Category"
            value={products[i].category}
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].category = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] text-[14px]  border-r border-r-[#eaeaea] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Type supplier name"
            value={products[i].supplier}
            required
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[i].supplier = e.target.value;
              setProducts(newProducts);
            }}
            className="p-[10px] text-[14px] truncate border-r border-r-[#eaeaea] focus:outline-none"
          />
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
