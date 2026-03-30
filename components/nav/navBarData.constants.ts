export type NavBarData = {
  logoLink: string | null;
  siteTitle: string;
  navMenu: NavMenuItems[];
};
export type NavMenuItems = {
  navName?: string;
};
export const navbarData = {
  logoLink: null,
  siteTitle: "WebSiteName",
  navMenu: [
    {
      navName: "Home",
      navLink: "/",
    },
    {
      navName: "About",
      navLink: "/about",
    },
    {
      navName: "contactUs",
      navLink: "/contact",
    },
  ],
};
