import { supabase } from "../../../lib/supabaseClient";

export const getAllSalesRecords = async () => {
  const { data, error } = await supabase
    .from("sales_record")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
export const getAllSalesItems = async () => {
  const { data, error } = await supabase
    .from("sales_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
