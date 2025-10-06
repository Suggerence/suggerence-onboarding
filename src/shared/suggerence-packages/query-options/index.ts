import { queryOptions } from "@tanstack/react-query";
import { getPackages } from "../api";

export const getSuggerencePackagesQueryOptions = () => {
    return queryOptions({
        queryKey: ['suggerence-packages'],
        queryFn: getPackages,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}