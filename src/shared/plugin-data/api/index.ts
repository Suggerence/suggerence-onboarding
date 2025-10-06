export const getPluginData = async (plugin_slugs: string[]): Promise<WordPressPlugin[]> => {
    const queryString = `slugs=${plugin_slugs.join(',')}`;
    const url = `https://api.ploogins.com/v1/public/plugins?${queryString}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}