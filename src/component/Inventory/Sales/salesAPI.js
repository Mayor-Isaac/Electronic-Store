import { supabase } from "../../../lib/supabaseClient";



export const createItems = async (itemsData) => {
  console.log("createItems called with===>", itemsData);
  const { data, error } = await supabase
    .from("sales_items")
    .insert(itemsData)
    .select();
  
  console.log("createItems response===>", { data, error });

  if (error) throw error;
  return data;
};
