// Hand-written row types mirroring supabase/migrations/0001_init.sql.
// Keep in sync with the SQL schema (or regenerate via `supabase gen types`).

export interface LongBioCard {
  heading: string;
  body: string;
}

export interface Socials {
  linkedin?: string;
  github?: string;
  x?: string;
  email?: string;
  [key: string]: string | undefined;
}

export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  roles: string[];
  hero_tagline: string;
  short_bio: string;
  long_bio: LongBioCard[];
  avatar_url: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  socials: Socials;
  badges: string[];
  cv_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string | null;
  period: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  kind: string;
  achievements: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string | null;
  summary: string | null;
  description: string | null;
  tech: string[];
  achievement: string | null;
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string | null;
  venue: string | null;
  year: number | null;
  kind: string;
  status: string;
  abstract: string | null;
  url_doi: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string | null;
  period: string | null;
  start_date: string | null;
  end_date: string | null;
  thesis_title: string | null;
  thesis_supervisor: string | null;
  achievements: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string | null;
  year: number | null;
  credential_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  proficiency: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Interest {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Tool {
  id: string;
  category: string;
  name: string;
  icon_slug: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Talk {
  id: string;
  title: string;
  event: string | null;
  venue: string | null;
  date: string | null;
  audience_size: number | null;
  kind: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  organization: string | null;
  description: string | null;
  icon_slug: string | null;
  period: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_url: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  seo_title: string | null;
  seo_description: string | null;
  default_theme: string;
  nav: unknown;
  created_at: string;
  updated_at: string;
}

// Minimal shape the supabase-js client needs for typed table access.
type Row<T> = T;
type Insert<T> = Partial<T>;
type Update<T> = Partial<T>;

interface TableDef<T> {
  Row: Row<T>;
  Insert: Insert<T>;
  Update: Update<T>;
  Relationships: [];
}

export interface Database {
  public: {
    Tables: {
      profile: TableDef<Profile>;
      experiences: TableDef<Experience>;
      projects: TableDef<Project>;
      publications: TableDef<Publication>;
      education: TableDef<Education>;
      certifications: TableDef<Certification>;
      skills: TableDef<Skill>;
      interests: TableDef<Interest>;
      tools: TableDef<Tool>;
      talks: TableDef<Talk>;
      service: TableDef<Service>;
      posts: TableDef<Post>;
      contact_messages: TableDef<ContactMessage>;
      site_settings: TableDef<SiteSettings>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
