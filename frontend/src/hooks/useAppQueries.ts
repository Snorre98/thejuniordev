import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getApps,
  getFavoriteApps,
  getFullIconUrl,
  getProjects,
  getProjectByAppId,
} from "../api/appApi";
import { useCallback } from "react";

// Query keys for better cache management
export const queryKeys = {
  apps: "apps",
  favoriteApps: "favoriteApps",
  projects: "projects",
  project: (id: number) => ["project", id],
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
  });
}

export function usePrefetch() {
  const queryClient = useQueryClient();

  const prefetchApps = useCallback(() => {
    // Prefetch apps data
    queryClient.prefetchQuery({
      queryKey: [queryKeys.apps],
      queryFn: getApps,
    });

    // Prefetch favorite apps
    queryClient.prefetchQuery({
      queryKey: [queryKeys.favoriteApps],
      queryFn: getFavoriteApps,
    });

    // Prefetch projects list
    queryClient.prefetchQuery({
      queryKey: [queryKeys.projects],
      queryFn: getProjects,
    });
  }, [queryClient]);

  const prefetchProject = useCallback(
    (appId: number) => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.project(appId),
        queryFn: () => getProjectByAppId(appId),
      });
    },
    [queryClient]
  );

  return { prefetchApps, prefetchProject };
}
