import { type Icons } from "@/components/icons";

export const siteConfig = {
  name: "youtube-clone",
  url: "https://youtube-clone.bensengupta.com",
  ogImage: "https://youtube-clone.bensengupta.com/og.jpg",
  description: "Modern youtube clone.",
  links: {
    personalGithub: "https://github.com/bensengupta",
    github: "https://github.com/bensengupta/youtube-clone",
  },
};

export type SiteConfig = typeof siteConfig;

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export type MainNavItem = NavItem;
export type SidebarNavItem = NavItemWithChildren;

interface NavConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const navConfig: NavConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Hello",
      href: "/hello",
      items: [],
    },
  ],
};
