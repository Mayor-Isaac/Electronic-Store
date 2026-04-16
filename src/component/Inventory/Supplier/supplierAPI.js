import { supabase } from "../../../lib/supabaseClient";
export const getAllSuppliers = async (sortOption) => {
  const isAscending = sortOption === "created_at" ? false : true;

  console.log("Fetching suppliers sorted by:", sortOption, "Ascending:", isAscending);
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order(sortOption, { ascending: isAscending });
  if (error) throw error;
  return data;
};

export const addSupplier = async (newSupplier) => {
  // console.log("Adding supplier:", newSupplier);
  const { data, error } = await supabase
    .from("suppliers")
    .insert([newSupplier]).select();
  if (error) throw error;
  return data;
};

export const deleteSupplier = async (id) => {
  const { error } = await supabase.from("suppliers").delete().eq("id", id);
  if (error) throw error;
};