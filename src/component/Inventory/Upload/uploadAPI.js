import { supabase } from "../../../lib/supabaseClient";


export const uploadProductImage = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images") 
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get the public URL to save in the database
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);
  return data.publicUrl;
};

export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select();

  if (error) throw error;
  return data;
};
