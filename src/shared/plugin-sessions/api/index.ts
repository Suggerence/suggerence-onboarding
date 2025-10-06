declare const SuggerenceOnboardingData: SuggerenceOnboardingData;

export const createPluginSession = async (args: { feature_session_id: string }): Promise<PluginSession> => {
    const response = await fetch(`${SuggerenceOnboardingData.suggerence_api_url}/suggest/plugin/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    });

    return response.json();
};

export const handlePluginSession = async (args: HandlePluginRequest): Promise<PluginSession> => {
    const response = await fetch(`${SuggerenceOnboardingData.suggerence_api_url}/suggest/plugin/sessions/${args.session_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    });

    return response.json();
};