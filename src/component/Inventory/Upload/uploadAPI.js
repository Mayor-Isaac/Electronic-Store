import { supabase } from "../../../lib/supabaseClient";


export const uploadProductImage = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images") 
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get the public URL to save in the database
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);
  return data.publicUrl;
};

export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select();

  if (error) throw error;
  return data;
};


export const getAllCategories = async (sortOption = "created_at") => {
  const safeSortOption = sortOption || "created_at";
  const isAscending = safeSortOption === "created_at" ? false : true;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order(safeSortOption, { ascending: isAscending });
  if (error) throw error;
  return data;
};

export const addCategory = async (newCategory) => {
  const { data, error } = await supabase
    .from("categories")
    .insert([newCategory])
    .select();
  if (error) throw error;
  return data;
};

export const updateCategory = async (updatedCategory) => {
  const { id, ...categoryData } = updatedCategory;
  const { data, error } = await supabase
    .from("categories")
    .update(categoryData)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
};

export const deleteCategory = async (id) => {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
};
