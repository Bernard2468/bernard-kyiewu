import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type {
  SiteProfile,
  NewsItem,
  ResearchInterest,
  EducationEntry,
  Publication,
  TeachingCourse,
  Award,
  ServiceEntry,
  SiteSection,
  CustomPage,
} from '@/types/database';

export interface SiteData {
  profile: SiteProfile | null;
  sections: SiteSection[];
  news: NewsItem[];
  research: ResearchInterest[];
  education: EducationEntry[];
  pubs: Publication[];
  teaching: TeachingCourse[];
  awards: Award[];
  service: ServiceEntry[];
  pages: CustomPage[];
}

export const SITE_DATA_KEY = ['site-data'] as const;

/**
 * One parallel fetch of every content table — mirrors the static site's
 * `loadPage()` / `loadAll()`. Returns ALL rows (including hidden); the public
 * page filters `visible` client-side, the admin shows everything.
 */
export async function fetchSiteData(): Promise<SiteData> {
  const [
    { data: profileRows },
    { data: sections },
    { data: news },
    { data: research },
    { data: education },
    { data: pubs },
    { data: teaching },
    { data: awards },
    { data: service },
    { data: pages },
  ] = await Promise.all([
    supabase.from('site_profile').select('*').order('id').limit(1),
    supabase.from('site_sections').select('*').order('sort_order'),
    supabase.from('news_items').select('*').order('sort_order'),
    supabase.from('research_interests').select('*').order('sort_order'),
    supabase.from('education_entries').select('*').order('sort_order'),
    supabase.from('publications').select('*').order('sort_order'),
    supabase.from('teaching_courses').select('*').order('sort_order'),
    supabase.from('awards').select('*').order('sort_order'),
    supabase.from('service_entries').select('*').order('sort_order'),
    supabase.from('custom_pages').select('*').order('sort_order'),
  ]);

  return {
    profile: profileRows?.[0] ?? null,
    sections: sections ?? [],
    news: news ?? [],
    research: research ?? [],
    education: education ?? [],
    pubs: pubs ?? [],
    teaching: teaching ?? [],
    awards: awards ?? [],
    service: service ?? [],
    pages: pages ?? [],
  };
}

/** Shared query used by both the public page and the admin dashboard. */
export const useSiteData = () =>
  useQuery({ queryKey: SITE_DATA_KEY, queryFn: fetchSiteData });

/** Returns a function that refetches all site data (call after admin writes). */
export const useReloadSiteData = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: SITE_DATA_KEY });
};
