export interface NavItem {
  label: string;
  to: string;
}

/** Public top-nav. Order matters. */
export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Research', to: '/research' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Teaching', to: '/teaching' },
  { label: 'Education', to: '/education' },
  { label: 'Writing', to: '/writing' },
  { label: 'CV', to: '/cv' },
  { label: 'Contact', to: '/contact' },
];
