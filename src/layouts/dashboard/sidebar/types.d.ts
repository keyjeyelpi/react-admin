export type iSidebarOptions = {
  title?: string;
  options: {
    title: string;
    url: string;
    alternativeLinks?: string[];
    icon: React.ReactElement<any>;
    activeIcon?: React.ReactElement<any>;
    endIcon?: React.ReactElement<any>;
    submenu?: {
      title: string;
      url: string;
    }[];
  }[];
}[];
