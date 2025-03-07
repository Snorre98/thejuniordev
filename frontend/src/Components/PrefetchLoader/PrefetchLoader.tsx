import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApps, getFavoriteApps, getProjects, getProjectByAppId } from "../../api/appApi";
import { queryKeys } from "../../hooks/useAppQueries";
import { LoadingDisplay } from "../../Display/LoadingDisplay";

interface PrefetchLoaderProps {
  children: React.ReactNode;
}

export function PrefetchLoader({ children }: PrefetchLoaderProps) {
  const queryClient = useQueryClient();
  const [prefetchComplete, setPrefetchComplete] = useState(false);
  
  // Query to get all apps first
  const { data: apps, isLoading: appsLoading } = useQuery({
    queryKey: [queryKeys.apps],
    queryFn: getApps,
  });

  // Query to get all favorite apps
  const { data: favoriteApps, isLoading: favAppsLoading } = useQuery({
    queryKey: [queryKeys.favoriteApps],
    queryFn: getFavoriteApps,
  });

  // Query to get all projects
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: [queryKeys.projects],
    queryFn: getProjects,
  });

  // Once we have the apps, prefetch all associated project data
  useEffect(() => {
    if (!apps || !favoriteApps || !projects) return;

    const allApps = [...apps, ...favoriteApps];
    const uniqueProjectIds = new Set<number>();
    
    // Collect all unique project IDs from apps
    allApps.forEach(app => {
      if (app.project) {
        uniqueProjectIds.add(app.project);
      }
    });

    // Start prefetching all project data in parallel
    const prefetchPromises = Array.from(uniqueProjectIds).map(projectId => {
      return queryClient.prefetchQuery({
        queryKey: queryKeys.project(projectId),
        queryFn: () => getProjectByAppId(projectId),
      });
    });

    // When all prefetch operations are complete, mark prefetching as done
    Promise.all(prefetchPromises)
      .then(() => {
        console.log(`Prefetched ${uniqueProjectIds.size} projects`);
        setPrefetchComplete(true);
      })
      .catch(error => {
        console.error("Error prefetching projects:", error);
        // Even if some prefetches fail, still mark as complete
        setPrefetchComplete(true);
      });
  }, [apps, favoriteApps, projects, queryClient]);

  // Show loading screen while we're loading the initial data
  if (appsLoading || favAppsLoading || projectsLoading || !prefetchComplete) {
    return <LoadingDisplay />;
  }

  // Once everything is prefetched, render the children
  return <>{children}</>;
}
