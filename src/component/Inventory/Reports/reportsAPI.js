import { supabase } from "../../../lib/supabaseClient";

export const getAllReports = async (page = 0, pageSize = 10) => {
  const from = page * pageSize;
  const to = from + pageSize - 1;


  const { data, error, count } = await supabase
    .from("report")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    error("Supabase Error:", error.message);
    throw error;
  }

  return { data, count };
};
export const getAllSalesItems = async () => {
  const { data, error } = await supabase
    .from("sales_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
