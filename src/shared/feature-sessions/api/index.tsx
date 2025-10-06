declare const SuggerenceOnboardingData: SuggerenceOnboardingData;

export const createFeatureSession = async (args: FeatureSessionRequest): Promise<FeatureSession> => {
    const response = await fetch(`${SuggerenceOnboardingData.suggerence_api_url}/suggest/features/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    });

    return response.json();
};

export const refineFeatureSession = async (args: RefineFeatureSessionRequest): Promise<FeatureSession> => {
    const response = await fetch(`${SuggerenceOnboardingData.suggerence_api_url}/suggest/features/sessions/refine`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    });

    return response.json();
};

export const getFeatureSession = async (session_id: string): Promise<FeatureSession> => {
    const response = await fetch(`${SuggerenceOnboardingData.suggerence_api_url}/suggest/features/sessions/${session_id}`);

    return response.json();
};