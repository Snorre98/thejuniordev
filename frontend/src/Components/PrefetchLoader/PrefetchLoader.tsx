import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getApps, getFavoriteApps, getProjectByAppId, getProjects } from '../../api/appApi';
import { fetchBioData } from '../../api/bioApi';
import { fetchLatestMessage, fetchThreads, fetchUser } from '../../api/chatApi';
import { queryKeys } from '../../hooks/useAppQueries';
import { bioQueryKeys } from '../../hooks/useBioQueries';
import { chatQueryKeys } from '../../hooks/useChatQueries';

interface PrefetchLoaderProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export function PrefetchLoader({ children, loadingComponent }: PrefetchLoaderProps) {
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

  // Query to get bio data
  const { data: bioData, isLoading: bioLoading } = useQuery({
    queryKey: [bioQueryKeys.allBioData],
    queryFn: fetchBioData,
  });

  // Query to get chat threads
  const { data: threads, isLoading: threadsLoading } = useQuery({
    queryKey: [chatQueryKeys.threads],
    queryFn: fetchThreads,
  });

  // Query to get latest message for notifications
  const { data: latestMessage, isLoading: latestMessageLoading } = useQuery({
    queryKey: [chatQueryKeys.latestMessage],
    queryFn: fetchLatestMessage,
  });

  // Once we have the apps, prefetch all associated project data
  useEffect(() => {
    if (!apps || !favoriteApps || !projects) return;

    const allApps = [...apps, ...favoriteApps];
    const uniqueProjectIds = new Set<number>();

    // Collect all unique project IDs from apps using for...of
    for (const app of allApps) {
      if (app.project) {
        uniqueProjectIds.add(app.project);
      }
    }

    // Start prefetching all project data in parallel
    const prefetchPromises = Array.from(uniqueProjectIds).map((projectId) => {
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
      .catch((error) => {
        console.error('Error prefetching projects:', error);
        // Even if some prefetches fail, still mark as complete
        setPrefetchComplete(true);
      });
  }, [apps, favoriteApps, projects, queryClient]);

  // Prefetch message data for all threads
  useEffect(() => {
    if (!threads) return;

    const prefetchPromises = threads.map((thread) => {
      return queryClient.prefetchQuery({
        queryKey: chatQueryKeys.messages(thread.id),
        queryFn: () => fetchThreads(),
      });
    });

    // Also prefetch user data for the latest message if available
    if (latestMessage?.sender) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: chatQueryKeys.user(latestMessage.sender),
          queryFn: () => fetchUser(latestMessage.sender),
        }),
      );
    }

    Promise.all(prefetchPromises)
      .then(() => {
        console.log(`Prefetched messages for ${threads.length} threads`);
      })
      .catch((error) => {
        console.error('Error prefetching messages:', error);
      });
  }, [threads, latestMessage, queryClient]);

  // Check if any of the major data types are still loading
  const isLoading =
    appsLoading ||
    favAppsLoading ||
    projectsLoading ||
    bioLoading ||
    threadsLoading ||
    latestMessageLoading ||
    !prefetchComplete;

  // Show loading component while we're loading the initial data
  if (isLoading && loadingComponent) {
    return <>{loadingComponent}</>;
  }

  // Once everything is prefetched, render the children
  return <>{children}</>;
}
