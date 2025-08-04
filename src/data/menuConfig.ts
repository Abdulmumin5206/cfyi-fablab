export interface MenuSlideConfig {
  id: number;
  type: 'blog' | 'service';
  imageUrl: string;
  fallbackUrl?: string;
  titleKey: string;
  descriptionKey: string;
  categoryKey?: string;
  linkTo: string;
}

export const mobileMenuSlides: MenuSlideConfig[] = [
  {
    id: 0,
    type: 'blog',
    imageUrl: '/menu/blog1.png',
    titleKey: 'mobileMenu.latestPostTitle',
    descriptionKey: 'mobileMenu.latestPostDescription',
    categoryKey: 'mobileMenu.latestPost',
    linkTo: '/projects/3d-printing-innovations'
  },
  {
    id: 1,
    type: 'service',
    imageUrl: '/menu/3dprinting1.png',
    titleKey: 'mobileMenu.services.3dPrinting.title',
    descriptionKey: 'mobileMenu.services.3dPrinting.description',
    categoryKey: 'mobileMenu.services.3dPrinting.category',
    linkTo: '/3d-printing'
  },
  {
    id: 2,
    type: 'service',
    imageUrl: '/menu/moulding1.png',
    titleKey: 'mobileMenu.services.molding.title',
    descriptionKey: 'mobileMenu.services.molding.description',
    categoryKey: 'mobileMenu.services.molding.category',
    linkTo: '/mould'
  },
  {
    id: 3,
    type: 'service',
    imageUrl: '/menu/courses1.png',
    titleKey: 'mobileMenu.services.courses.title',
    descriptionKey: 'mobileMenu.services.courses.description',
    categoryKey: 'mobileMenu.services.courses.category',
    linkTo: '/courses'
  }
];

export interface ServiceItem {
  nameKey: string;
  path: string;
  seoUrl?: (lang: string) => string;
}

export const servicesConfig: ServiceItem[] = [
  {
    nameKey: 'header.services.3dPrinting',
    path: '/3d-printing',
    seoUrl: (lang: string) => {
      if (lang === 'ru' || lang === 'uz') {
        return '/3d-printing-tashkent';
      }
      return '/3d-printing-services';
    }
  },
  {
    nameKey: 'header.services.molding',
    path: '/mould'
  },
  {
    nameKey: 'header.services.digitalFabrication',
    path: '/digital-fabrication'
  },
  {
    nameKey: 'header.services.3dScanning',
    path: '/3d-scanning'
  },
  {
    nameKey: 'header.services.courses',
    path: '/courses'
  }
]; 