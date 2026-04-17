import React from 'react'
import UploadForm from './UploadForm';
import useAlter from '../../../hooks/useAlter';
import useFetch from '../../../hooks/useFetch';
import { addCategory, getAllCategories } from './uploadAPI';
import { toast } from 'react-toastify';

export default function Upload() {
  const [showCategoryForm, setShowCategoryForm] = React.useState(false);



  return (
    <div>
      <h3 className="text-3xl font-medium my-4 ">Upload Inventory Data</h3>

      <div className="grid grid-cols-[45px_1fr_280px_120px_120px_120px_180px_190px_120px_65px]  items-center  bg-[#E8EFF9]  rounded-tr-lg rounded-tl-lg">
        {[
          "S/N",
          "Name",
          "Description",
          "Stock Qty",
          "Cost Price",
          "Selling Price",
        ].map((item, index) => {
          return (
            <div key={index} className="p-[10px] text-[14px] font-bold">
              {item}
            </div>
          );
        })}
        <div className="p-[10px] text-[14px] font-bold relative flex items-center gap-4">
          {showCategoryForm && (
            <CategoryForm setShowCategoryForm={setShowCategoryForm} />
          )}
          Category{" "}
          <span
            className="text-blue-500 text-sm hover:underline cursor-pointer animate-pulse"
            onClick={() => setShowCategoryForm(true)}
          >
            Add Category
          </span>
        </div>
        {["Supplier", "Product Image", "Action"].map((item, index) => {
          return (
            <div key={index} className="p-[10px] text-[14px] font-bold">
              {item}
            </div>
          );
        })}
      </div>
      <UploadForm />
    </div>
  );
}


const CategoryForm = ({ setShowCategoryForm }) => {
  const [categoryName, setCategoryName] = React.useState('');
  const [categoryDescription, setCategoryDescription] = React.useState('');
  const { data: categories = [] } = useFetch({
    queryFn: getAllCategories,
    key: 'categories',
  });

  // Mutation for creating the category
  const categoryMutation = useAlter({
    mutationFn: addCategory,
    key: 'categories',
    onSuccessCallback: () => {
      setShowCategoryForm(false);
      setCategoryName('');
      setCategoryDescription('');
      toast.success(`${categoryName.trim()} added!`);
    },
    onErrorCallback: (error) => {
      toast.error(error.message || 'Failed to add category');
    },
  });

  const handleAddCategory = (e) => {
    e.preventDefault();

    const cleanedName = categoryName.trim();
    if (!cleanedName) return;

    const exists = categories.some(
      (category) =>
        category?.name?.trim().toLowerCase() === cleanedName.toLowerCase()
    );

    if (exists) {
      toast.info(`${cleanedName} already exists.`);
      return;
    }

    categoryMutation.mutate({
      name: cleanedName,
      description: categoryDescription.trim(),
    });
  };
  return (
    <form
      onSubmit={handleAddCategory}
      className="mb-4 flex flex-wrap absolute top-20 items-end gap-5 rounded-lg border border-gray-200 bg-gray-50 p-4"
      onMouseLeave={() => setShowCategoryForm(false)}
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Name <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category name"
          required
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none font-normal focus:ring-1 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-[260px]">
        <label className="text-sm font-medium">Description</label>
        <input
          type="text"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
          placeholder="Short description (optional)"
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none font-normal focus:ring-1 focus:ring-gray-400"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setShowCategoryForm(false)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}