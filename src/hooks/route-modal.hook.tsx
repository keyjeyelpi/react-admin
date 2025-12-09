import { useLocation } from 'react-router-dom';

export const useRouteModal = (toUrl: string, backUrl?: string) => {
  const location = useLocation();

  const hash = toUrl.startsWith('#') ? toUrl : `#${toUrl}`;
  const show = location.hash === hash;

  const setShow = (value: boolean) => {
    if (value) {
      window.location.hash = hash;
    } else {
      window.location.hash = '';

      if (backUrl) window.location.href = backUrl;
    }
  };

  return [show, setShow];
};
