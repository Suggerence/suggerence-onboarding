import apiFetch from "@wordpress/api-fetch";

declare const SuggerenceOnboardingData: SuggerenceOnboardingData;

export const installTheme = async (themeSlug: string) => {
    return fetch(`${SuggerenceOnboardingData.admin_ajax_url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            action: 'install-theme',
            slug: themeSlug,
            _ajax_nonce: SuggerenceOnboardingData.updates_nonce,
        })
    });
}

export const switchTheme = async (themeSlug: string) => {
    apiFetch.use(apiFetch.createNonceMiddleware(SuggerenceOnboardingData.nonce));

    return apiFetch({
        path: `suggerence-onboarding/v1/themes/switch`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            theme: themeSlug,
        }
    });
}