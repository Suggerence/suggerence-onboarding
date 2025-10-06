import { queryOptions } from "@tanstack/react-query";
import { getPluginData } from "../api";

export const getPluginDataQueryOptions = (plugin_slugs: string[]) => {
    return queryOptions({
        queryKey: ['plugin-data', plugin_slugs],
        queryFn: () => getPluginData(plugin_slugs),
        enabled: !!plugin_slugs.length,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}