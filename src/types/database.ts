// Row types for the academic-profile Supabase schema (profile/sql/schema.sql).
// These mirror the tables the public site and admin dashboard read/write.
// Keep in sync with the SQL schema.

export interface SiteProfile {
  id: number;
  full_name: string;
  name_alt: string;
  title: string;
  department_1: string;
  department_2: string;
  university: string;
  address: string;
  office: string;
  phone: string;
  email: string;
  photo_url: string;
  biography: string;
  scholar_url: string;
  researchgate_url: string;
  linkedin_url: string;
  github_url: string;
  orcid_url: string;
  cv_url: string;
  students_text: string;
  students_email: string;
  updated_at: string;
}

export interface NewsItem {
  id: number;
  event_date: string | null;
  body: string;
  sort_order: number;
  visible: boolean;
}

export interface ResearchInterest {
  id: number;
  label: string;
  sort_order: number;
}

export interface EducationEntry {
  id: number;
  degree: string;
  institution: string;
  sort_order: number;
}

export type PublicationType = 'journal' | 'conference' | 'workshop';

export interface Publication {
  id: number;
  pub_id: string;
  pub_type: PublicationType | string;
  citation: string;
  pdf_url: string;
  doi_url: string;
  slides_url: string;
  award_note: string;
  year: number | null;
  sort_order: number;
  visible: boolean;
}

export interface TeachingCourse {
  id: number;
  label: string;
  institution: string;
  sort_order: number;
}

export interface Award {
  id: number;
  label: string;
  year: number | null;
  sort_order: number;
}

export interface ServiceEntry {
  id: number;
  category: string;
  label: string;
  sort_order: number;
}

export interface SiteSection {
  id: number;
  slug: string;
  label: string;
  sort_order: number;
  visible: boolean;
}

export interface CustomPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  sort_order: number;
  visible: boolean;
}

// Minimal shape the supabase-js client needs for typed table access.
type Insert<T> = Partial<T>;
type Update<T> = Partial<T>;

interface TableDef<T> {
  Row: T;
  Insert: Insert<T>;
  Update: Update<T>;
  Relationships: [];
}

export interface Database {
  public: {
    Tables: {
      site_profile: TableDef<SiteProfile>;
      news_items: TableDef<NewsItem>;
      research_interests: TableDef<ResearchInterest>;
      education_entries: TableDef<EducationEntry>;
      publications: TableDef<Publication>;
      teaching_courses: TableDef<TeachingCourse>;
      awards: TableDef<Award>;
      service_entries: TableDef<ServiceEntry>;
      site_sections: TableDef<SiteSection>;
      custom_pages: TableDef<CustomPage>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
