import { getSitePlugins, getSiteSettings } from "../api";

export const getSiteSettingsQueryOptions = () => {
    return {
        queryKey: ['site-data', 'settings'],
        queryFn: getSiteSettings,
    };
};

export const getSitePluginsQueryOptions = () => {
    return {
        queryKey: ['site-data', 'plugins'],
        queryFn: getSitePlugins,
    };
};

export const getSitePluginsSlugsQueryOptions = () => {
    return {
        queryKey: ['site-data', 'plugins', 'slugs'],
        queryFn: getSitePlugins,
        select: (data: WpRestPluginsResponse): string[] => data.map((plugin) => plugin.plugin.split('/')[0]),
    };
};