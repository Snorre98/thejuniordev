import { useQuery } from "@tanstack/react-query";
import { fetchBioData, fetchBioCategoryData } from "../api/bioApi";

// Query keys for better cache management
export const bioQueryKeys = {
  allBioData: "bio",
  bioCategory: (category: string) => ["bio", category],
};

export function useBioData() {
  return useQuery({
    queryKey: [bioQueryKeys.allBioData],
    queryFn: fetchBioData,
  });
}

export function useBioCategory(category: string | null) {
  return useQuery({
    queryKey: bioQueryKeys.bioCategory(category || ""),
    queryFn: () => fetchBioCategoryData(category || ""),
    enabled: !!category, // Only run if category is provided
  });
}
