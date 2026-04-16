import { supabase } from "../../../lib/supabaseClient";
export const getAllSuppliers = async (sortOption = "created_at") => {
  const safeSortOption = sortOption || "created_at";
  const isAscending = safeSortOption === "created_at" ? false : true;

  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order(safeSortOption, { ascending: isAscending });
  if (error) throw error;
  return data;
};

export const addSupplier = async (newSupplier) => {
  const { data, error } = await supabase
    .from("suppliers")
    .insert([newSupplier]).select();
  if (error) throw error;
  return data;
};

export const updateSupplier = async (updatedSupplier) => {
  const { id, ...supplierData } = updatedSupplier;
  const { data, error } = await supabase.from("suppliers").update(supplierData).eq("id", id).select();
  if (error) throw error;
  return data;
};

export const deleteSupplier = async (id) => {
  const { error } = await supabase.from("suppliers").delete().eq("id", id);
  if (error) throw error;
};
