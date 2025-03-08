import { useQuery } from '@tanstack/react-query';
import { getApps, getFavoriteApps, getFullIconUrl, getProjectByAppId, getProjects } from '../api/appApi';

// Query keys for better cache management
export const queryKeys = {
  apps: 'apps',
  favoriteApps: 'favoriteApps',
  projects: 'projects',
  project: (id: number) => ['project', id],
};

export function useApps() {
  return useQuery({
    queryKey: [queryKeys.apps],
    queryFn: getApps,
    select: (data) =>
      data.map((app) => ({
        ...app,
        icon_url: getFullIconUrl(app.icon_url),
      })),
  });
}

export function useFavoriteApps() {
  return useQuery({
    queryKey: [queryKeys.favoriteApps],
    queryFn: getFavoriteApps,
    select: (data) =>
      data.map((app) => ({
        ...app,
        icon_url: getFullIconUrl(app.icon_url),
      })),
  });
}

export function useProjects() {
  return useQuery({
    queryKey: [queryKeys.projects],
    queryFn: getProjects,
  });
}

export function useProject(appId: number | null) {
  return useQuery({
    queryKey: queryKeys.project(appId || 0),
    queryFn: () => getProjectByAppId(appId || 0),
    enabled: !!appId, // Only run if appId is provided
    select: (data) =>
      data
        ? {
            ...data,
            icon: getFullIconUrl(data.icon),
          }
        : null,
  });
}
