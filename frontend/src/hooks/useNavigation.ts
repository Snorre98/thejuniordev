import { useCallback, useState } from 'react';
import { routes } from '../routes';
import { useStore } from '../store';

export const useNavigation = () => {
  const { setScreen, currentScreen } = useStore();
  const [params, setParams] = useState({});

  const navigate = useCallback(
    (path: string, newParams = {}) => {
      const route = routes.find((r) => r.path === path);
      if (route) {
        setScreen(route.path.split('/')[1] as any);
        setParams(newParams);
      }
    },
    [setScreen],
  );

  const getCurrentRoute = useCallback(() => {
    return routes.find((r) => r.path.startsWith(`/${currentScreen}`));
  }, [currentScreen]);

  return { navigate, params, getCurrentRoute };
};
