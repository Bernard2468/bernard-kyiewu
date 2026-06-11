import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderKanban,
  BookOpen,
  GraduationCap,
  Presentation,
  Wrench,
  HeartHandshake,
  PenLine,
  Mail,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Implemented in this phase? Others render a "coming soon" placeholder. */
  ready?: boolean;
}

export const adminNav: AdminNavItem[] = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, ready: true },
  { label: 'Profile', to: '/admin/profile', icon: User, ready: true },
  { label: 'Experience', to: '/admin/experience', icon: Briefcase, ready: true },
  { label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { label: 'Publications', to: '/admin/publications', icon: BookOpen },
  { label: 'Education', to: '/admin/education', icon: GraduationCap },
  { label: 'Teaching & Talks', to: '/admin/teaching', icon: Presentation },
  { label: 'Tools', to: '/admin/tools', icon: Wrench },
  { label: 'Service', to: '/admin/service', icon: HeartHandshake },
  { label: 'Writing', to: '/admin/writing', icon: PenLine },
  { label: 'Messages', to: '/admin/messages', icon: Mail },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];
