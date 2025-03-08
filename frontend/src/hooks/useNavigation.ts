import { useCallback, useState } from 'react';
import { useStore } from '../store/store';
import type { Screens } from '../types';

export const useNavigation = () => {
  const { setScreen, currentScreen } = useStore();
  const [params, setParams] = useState<Record<string, unknown>>({});

  const navigate = useCallback(
    (screen: Screens, newParams = {}) => {
      setScreen(screen);
      setParams(newParams);
    },
    [setScreen],
  );

  return { navigate, params, currentScreen };
};
