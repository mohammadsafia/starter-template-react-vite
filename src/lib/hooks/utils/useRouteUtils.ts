import { useLocation } from 'react-router-dom';

export const useRouteUtils = () => {
  const { pathname } = useLocation();

  const isActiveLink = (path: string): boolean => {
    const pathArray = pathname.split('/').filter((item) => item !== '');

    if (path === '/' && pathArray.length < 1) return true;

    return JSON.stringify(pathArray) === JSON.stringify(path.split('/').filter((item) => item !== ''));
  };

  const isActiveSubLink = (path: string): boolean => {
    const pathArray = pathname.split('/').filter((item) => item !== '');

    if (path === '/' && pathArray.length < 1) return true;

    return JSON.stringify(path.split('/').filter((item) => item !== '')).includes(pathArray[0]);
  };

  return { isActiveLink, isActiveSubLink };
};
