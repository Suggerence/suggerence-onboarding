import apiFetch from "@wordpress/api-fetch";

declare const SuggerenceOnboardingData: SuggerenceOnboardingData;

export const getSiteSettings = async (): Promise<SiteSettings> => {
    apiFetch.use(apiFetch.createNonceMiddleware(SuggerenceOnboardingData.nonce));

    const data = await apiFetch({
        path: 'wp/v2/settings',
    });

    return data as SiteSettings;
};

export const getSitePlugins = async (): Promise<WpRestPluginsResponse> => {
    apiFetch.use(apiFetch.createNonceMiddleware(SuggerenceOnboardingData.nonce));

    const data = await apiFetch({
        path: 'wp/v2/plugins',
    });

    return data as WpRestPluginsResponse;
};