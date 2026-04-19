import { supabase } from "../../../lib/supabaseClient";



export const createItems = async (itemsData) => {
  const { data, error } = await supabase
    .from("sales_items")
    .insert(itemsData)
    .select();

  if (error) throw error;
  return data;
};

export const createSalesRecord = async (salesData) => {
  const { data, error } = await supabase
    .from("sales_record")
    .insert(salesData)
    .select();

  if (error) throw error;
  return data;
};


export const updateProductQty = (items) => {
  return Promise.all(
    items.map(async (item) => {
      const { product_id, quantity_left } = item;
      const { error } = await supabase
        .from("products")
        .update({ quantity_left })
        .eq("id", product_id)
        .select();

      if (error) {
        throw error;
      }
    }),
  );

};