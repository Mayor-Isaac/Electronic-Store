import { supabase } from "../../../lib/supabaseClient";
export const getAllSuppliers = async () => {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    // .order("created_at", { ascending: false });
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