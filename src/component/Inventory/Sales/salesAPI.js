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

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
};

export const addCategory = async (categoryData) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(categoryData)
    .select();
  
  if (error) throw error;
  return data;
};

export const updateProductQty = (items) => {

  items.map(async (items) => {
    const { product_id, quantity_left } = items;
    const { data, error } = await supabase
      .from("products")
      .update({ quantity_left: quantity_left })
      .eq("id", product_id)
      .select();
    
    if( error) {
      throw error;
    }
  });

};