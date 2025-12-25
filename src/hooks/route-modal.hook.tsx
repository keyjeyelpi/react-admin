import { useEffect, useMemo, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

type Params = Record<string, string | undefined>;

export function useRouteModal(
  routePattern: string | string[],
  locationOverride?: string,
): [boolean, (open: boolean) => void, Params] {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModalState] = useState(false);

  const match = useMemo(() => {
    const patterns: string[] = Array.isArray(routePattern) ? routePattern : [routePattern];
    for (const pattern of patterns) {
      // For relative patterns, match against the suffix of the pathname
      const patternParts = pattern.split('/');
      const pathnameParts = location.pathname.split('/').slice(1); // Skip the first empty part
      if (pathnameParts.length >= patternParts.length) {
        const suffixParts = pathnameParts.slice(-patternParts.length);
        const suffix = '/' + suffixParts.join('/');
        const fullPattern = '/' + pattern;
        const m = matchPath({ path: fullPattern, end: true }, suffix);
        if (m) return m;
      }
    }
    return null;
  }, [routePattern, location.pathname]);

  const params = match?.params ?? {};

  // Open/close modal based on route match
  useEffect(() => {
    setTimeout(() => {
      setShowModalState(Boolean(match));
    }, 100);
  }, [match]);

  // Allow manual control while keeping URL in sync
  const setShowModal = (open: boolean) => {
    setTimeout(() => {
      if (!open) {
        navigate(locationOverride ?? '..', { replace: true });
      }
    }, 0);
    setShowModalState(open);
  };

  return [showModal, setShowModal, params];
}
