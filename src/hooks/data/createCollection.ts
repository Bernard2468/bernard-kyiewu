import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type TableName = keyof Database['public']['Tables'];
type RowOf<T extends TableName> = Database['public']['Tables'][T]['Row'];
type InsertOf<T extends TableName> = Database['public']['Tables'][T]['Insert'];
type UpdateOf<T extends TableName> = Database['public']['Tables'][T]['Update'];

// A permissively-typed handle. Querying a *generic* table name confuses
// supabase-js's deep result-type inference, so we read/write through the
// untyped client and re-apply our own row types on the way out.
const db = supabase as unknown as SupabaseClient;

interface CollectionOptions {
  /** Column to order by (defaults to "sort_order"). */
  orderBy?: string;
  ascending?: boolean;
}

/**
 * Builds a typed set of React Query hooks for a Supabase table:
 * a list query plus create / update / delete mutations that invalidate the list.
 * Used by the public pages (read) and admin editors (write).
 */
export function createCollection<T extends TableName>(
  table: T,
  { orderBy = 'sort_order', ascending = true }: CollectionOptions = {},
) {
  const key: QueryKey = [table];

  const useList = () =>
    useQuery({
      queryKey: key,
      queryFn: async (): Promise<RowOf<T>[]> => {
        const { data, error } = await db
          .from(table)
          .select('*')
          .order(orderBy, { ascending });
        if (error) throw error;
        return (data ?? []) as RowOf<T>[];
      },
    });

  const useCreate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (values: InsertOf<T>) => {
        const { data, error } = await db.from(table).insert(values).select().single();
        if (error) throw error;
        return data as RowOf<T>;
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: key }),
    });
  };

  const useUpdate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, values }: { id: string; values: UpdateOf<T> }) => {
        const { data, error } = await db
          .from(table)
          .update(values)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data as RowOf<T>;
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: key }),
    });
  };

  const useRemove = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await db.from(table).delete().eq('id', id);
        if (error) throw error;
        return id;
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: key }),
    });
  };

  return { key, useList, useCreate, useUpdate, useRemove };
}
