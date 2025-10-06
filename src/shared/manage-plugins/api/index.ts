import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

declare const SuggerenceOnboardingData: SuggerenceOnboardingData;

export const installPlugin = (args: { pluginSlug: string, status: string }): Promise<void> => {
    apiFetch.use(apiFetch.createNonceMiddleware(SuggerenceOnboardingData.nonce));

    return apiFetch({
        path: '/wp/v2/plugins',
        method: 'POST',
        data: {
            slug: args.pluginSlug,
            status: args.status
        }
    });
    // No return value, just resolves when the plugin is installed
}

export const updatePluginStatus = (args: { pluginSlug: string, status: string, plugin: string }): Promise<void> => {
    apiFetch.use(apiFetch.createNonceMiddleware(SuggerenceOnboardingData.nonce));

    return apiFetch({
        path: '/wp/v2/plugins/' + args.pluginSlug,
        method: 'POST',
        data: {
            plugin: args.plugin,
            status: args.status
        }
    });
    // No return value, just resolves when the plugin is installed
}