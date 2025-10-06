import { useFeatureSessionStore } from "../stores/featureSessionStore";
import { useSelectedPackageStore } from "../stores/selectedPackageStore";
import { useStepStore } from "../stores/stepStore";
import { useUserChoicesStore } from "../stores/userChoicesStore";

export const useOnboardingReset = () => {
    const { setFeatureSession } = useFeatureSessionStore();
    const { setStep } = useStepStore();
    const { setSelectedPackage } = useSelectedPackageStore();
    const { setUserDescription } = useUserChoicesStore();

    const reset = () => {
        setFeatureSession({} as FeatureSession);
        setStep('user-prompts');
        setSelectedPackage('');
        setUserDescription('');
    }

    return { reset };
}