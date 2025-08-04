import { NavigateFunction } from 'react-router-dom';

export const getSEOUrl = (service: string, language: string): string => {
  switch (service) {
    case '3d-printing':
      switch (language) {
        case 'ru':
        case 'uz':
          return '/3d-printing-tashkent';
        default:
          return '/3d-printing-services';
      }
    default:
      return `/${service}`;
  }
};

export const normalizePath = (path: string, currentPath: string): boolean => {
  if (path === "/" && (currentPath === "/" || currentPath === "")) {
    return true;
  }
  return currentPath === path || currentPath === `${path}/`;
};

export const pathStartsWith = (prefix: string, currentPath: string): boolean => {
  return currentPath.startsWith(prefix);
};

export const navigateToSection = (
  navigate: NavigateFunction,
  path: string,
  sectionId: string,
  delay: number = 200
) => {
  navigate(path);
  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Retry after longer delay if section not found
      setTimeout(() => {
        const retrySection = document.getElementById(sectionId);
        if (retrySection) {
          retrySection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, delay);
};

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}; 