import { supabase } from "../../../lib/supabaseClient";

export const getOrderRecord = async () => {
  const { data, error } = await supabase
    .from("order_record")
    .select("*");

  if (error) throw error;
  return data;
};