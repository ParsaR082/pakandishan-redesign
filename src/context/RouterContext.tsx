import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export interface RouteState {
  pathname: string;
  search: string;
  hash: string;
}

interface RouterContextValue extends RouteState {
  navigate: (to: string, options?: { replace?: boolean }) => void;
  query: URLSearchParams;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function readWindowRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '', hash: '' };
  }
  const rawPath = window.location.pathname || '/';
  const normalizedPath =
    rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
  return {
    pathname: normalizedPath,
    search: window.location.search || '',
    hash: window.location.hash || '',
  };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteState>(readWindowRoute);

  useEffect(() => {
    const onPopState = () => {
      setRoute(readWindowRoute());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback(
    (to: string, options?: { replace?: boolean }) => {
      if (typeof window === 'undefined') return;

      // Support in-page anchor links like "#contact" or "#products"
      if (to.startsWith('#')) {
        const targetId = to.slice(1);
        const existingEl = document.getElementById(targetId);
        if (existingEl) {
          const top = Math.max(
            0,
            existingEl.getBoundingClientRect().top + window.scrollY - 84
          );
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
        // Fallback: navigate to corresponding dedicated route if element not on current page
        const hashRouteMap: Record<string, string> = {
          hero: '/',
          products: '/products',
          categories: '/products',
          technology: '/about',
          advantages: '/services',
          contact: '/contact',
        };
        const mapped = hashRouteMap[targetId] ?? '/';
        window.history.pushState(null, '', mapped);
        setRoute(readWindowRoute());
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const url = new URL(to, window.location.origin);
      const nextUrl = `${url.pathname}${url.search}${url.hash}`;

      if (options?.replace) {
        window.history.replaceState(null, '', nextUrl);
      } else {
        window.history.pushState(null, '', nextUrl);
      }

      const nextState = readWindowRoute();
      setRoute(nextState);

      if (url.hash) {
        const targetId = url.hash.slice(1);
        window.setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            const top = Math.max(
              0,
              el.getBoundingClientRect().top + window.scrollY - 84
            );
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    },
    []
  );

  const query = useMemo(() => new URLSearchParams(route.search), [route.search]);

  const value = useMemo<RouterContextValue>(
    () => ({
      ...route,
      navigate,
      query,
    }),
    [route, navigate, query]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used inside RouterProvider');
  }
  return ctx;
}
