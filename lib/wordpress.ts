interface NavItem {
  label: string;
  link: string;
}

interface NavLinks {
  home: NavItem;
  service: NavItem;
  bas_support: NavItem;
  bookkeeping: NavItem;
  payroll: NavItem;
  contact: NavItem;
}

interface Header {
  logo: {
    logo_text: string;
  };
  nav_links: NavLinks[];
  cta: {
    cta_text: string;
    header_cta_link: string;
  };
}

export interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    footer: any;
    contact_us: any;
    testimonials: any;
    why_choose_us: any;
    services: any;
    header: Header;
    logo_image: string;
    nav_links: Array<{
      home: {
        title: string;
        url: string;
        target: string;
      };
      services: string;
      bas_support: {
        title: string;
        url: string;
        target: string;
      };
      bookkeeping: {
        title: string;
        url: string;
        target: string;
      };
      payroll: {
        title: string;
        url: string;
        target: string;
      };
      contact: {
        title: string;
        url: string;
        target: string;
      };
    }>;
    cta_button_text: string;
    cta_button_url: string;
    show_arrow_icon: boolean;
    hero_section: {
      hero_image: any;
      highlights: any;
      secondary_cta: any;
      primary_cta: any;
      title: string;
      subtitle: string;
    };
    title: string;
    subtitle: string;
    primary_cta_text: string;
    primary_cta_url: string;
  };
  footer: {
    logo: string;
    copyright_text: string;
    footer_links: {
      label: string;
      link: string;
    }[];
  };
}

const WORDPRESS_API_URL = 'https://ashish.digital6.au/wp-json/wp/v2';

export async function getPage(pageId: number): Promise<WordPressPage> {
  const response = await fetch(`${WORDPRESS_API_URL}/pages/${pageId}`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.statusText}`);
  }

  return response.json();
}

export async function getAllPages(): Promise<WordPressPage[]> {
  const response = await fetch(`${WORDPRESS_API_URL}/pages`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch pages: ${response.statusText}`);
  }

  return response.json();
} 