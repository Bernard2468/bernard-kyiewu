import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';
import { createCollection } from './createCollection';

// ---------------------------------------------------------------------------
// Singletons: profile + site_settings (one row each)
// ---------------------------------------------------------------------------
export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
  });

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<Profile> }) => {
      const { data, error } = await supabase
        .from('profile')
        .update(values as never)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
};

// ---------------------------------------------------------------------------
// Collections — ordered by sort_order unless noted
// ---------------------------------------------------------------------------
export const experiences = createCollection('experiences');
export const projects = createCollection('projects');
export const publications = createCollection('publications');
export const education = createCollection('education');
export const certifications = createCollection('certifications');
export const skills = createCollection('skills');
export const interests = createCollection('interests');
export const tools = createCollection('tools');
export const talks = createCollection('talks');
export const service = createCollection('service');
export const posts = createCollection('posts', { orderBy: 'published_at', ascending: false });
export const messages = createCollection('contact_messages', {
  orderBy: 'created_at',
  ascending: false,
});

// Convenience read hooks used across public pages
export const useExperiences = experiences.useList;
export const useProjects = projects.useList;
export const usePublications = publications.useList;
export const useEducation = education.useList;
export const useCertifications = certifications.useList;
export const useSkills = skills.useList;
export const useInterests = interests.useList;
export const useTools = tools.useList;
export const useTalks = talks.useList;
export const useService = service.useList;
export const usePosts = posts.useList;
