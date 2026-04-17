import { supabase } from "../../../lib/supabaseClient";
export const getAllProducts = async (sortOption = "created_at") => {
  const safeSortOption = sortOption || "created_at_desc";

  const sortMap = {
    name: { column: "name", ascending: true },
    created_at_desc: { column: "created_at", ascending: false },
    quantity_left_asc: { column: "quantity_left", ascending: true },
    quantity_left_desc: { column: "quantity_left", ascending: false },
  };

  const selectedSort = sortMap[safeSortOption] || sortMap.created_at_desc;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order(selectedSort.column, { ascending: selectedSort.ascending });
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
