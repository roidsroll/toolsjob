import React from 'react';
import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

// Sourced from a public domain SVG icon library
const TikTokIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.6 5.82s.51-2.19.83-3.18c.33-1 .15-1.64-1.12-1.64-1.5 0-2.28.69-2.28 2.37v6.05c0 4.9-3.41 6.48-6.93 6.48-3.52 0-4.9-2.09-4.9-4.32 0-2.23 1.38-3.96 4.3-3.96h.21c-.24 1.25-.24 2.58-.24 3.96 0 .9.33 1.64 1.38 1.64.9 0 1.27-.6 1.27-1.42V8.39c0-3.37-1.68-6.14-5.5-6.14-3.82 0-6.48 2.77-6.48 6.58 0 3.81 2.66 6.93 6.93 6.93 4.27 0 7.39-2.77 7.39-7.5v-5.1c.33.1.66.2 1.05.2.9 0 1.7-.33 1.7-1.42s-.8-1.42-1.7-1.42c-.4 0-.74.1-.98.2z" />
  </svg>
);

export type PlatformName = 'Instagram' | 'TikTok' | 'Facebook' | 'Linkedin' | 'Twitter';

export const platformIcons: Record<PlatformName, React.ElementType> = {
  Instagram,
  TikTok: TikTokIcon,
  Facebook,
  Linkedin,
  Twitter,
};
