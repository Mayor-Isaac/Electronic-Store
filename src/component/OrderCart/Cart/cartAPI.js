import { supabase } from "../../../lib/supabaseClient";

export const getAdminLiveCarts = async () => {
  const { data, error, count } = await supabase.from('admin_live_carts')
  .select('*', { count: 'exact' });

  if (error) throw error;
  return { data, count };
};