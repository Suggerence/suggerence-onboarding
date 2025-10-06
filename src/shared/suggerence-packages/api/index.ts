declare const SuggerenceOnboardingData: SuggerenceOnboardingData;

export const getPackages = async (): Promise<SuggerencePackage[]> => {
    const response = await fetch(`${SuggerenceOnboardingData.suggerence_api_url}/suggest/packages`);
    return response.json();
}