import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrefetchLoader } from "./Components/PrefetchLoader";

// Create a client with optimized settings for prefetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1, // Only retry once on failure
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrefetchLoader>
        <App />
      </PrefetchLoader>
    </QueryClientProvider>
  </React.StrictMode>
);
