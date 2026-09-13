/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase credentials. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.'
  );
}

const createMockSupabase = () => {
  const defaultChain = {
    eq: () => defaultChain,
    ilike: () => defaultChain,
    order: () => defaultChain,
    limit: () => defaultChain,
    single: async () => ({ data: { id: '1', username: 'admin', role: 'admin', is_active: true, company_name: 'Stretchline' }, error: null }),
    then: (resolve: any) => resolve({ data: [], error: null })
  };

  return {
    from: (table: string) => ({
      select: () => {
        return {
          ...defaultChain,
          ilike: (col: string, val: string) => ({
            eq: (col2: string, val2: string) => ({
              single: async () => {
                if (table === 'app_users' && val === 'admin' && val2 === 'admin') {
                  return { data: { id: '1', username: 'admin', role: 'admin', is_active: true }, error: null };
                }
                return { data: null, error: new Error('Mock: Invalid credentials. Use admin/admin.') };
              }
            })
          })
        };
      },
      insert: async (data: any) => ({ data: Array.isArray(data) ? data : [data], error: null }),
      update: () => defaultChain,
      delete: () => defaultChain
    })
  };
};

export const hasSupabaseConfig = !!(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    })
  : createMockSupabase() as any;

export const isMocked = !hasSupabaseConfig;
