import { useStepStore } from "../stores/stepStore";
import { useThinkingStore } from "../stores/thinkingStore";
import { useFinishOnboarding } from "./useFinishOnboarding";

type Step = {
    id: string;
};

export const useSteps = () => {
    const steps = [
        {
            id: 'user-prompts',
        },
        {
            id: 'features',
        },
       {
            id: 'plugins',
        },
        {
            id: 'summary',
        },
        // {
        //     id: 'settings',
        // },
        {
            id: 'packages',
        },
    ];

    const { step, setStep } = useStepStore();
    const { setIsThinking } = useThinkingStore();
    const { finishOnboarding } = useFinishOnboarding();
    const currentStep = steps.find((stepItem) => stepItem.id === step) as Step;
    const isFirstStep = steps.indexOf(currentStep) === 0;
    const isLastStep = steps.indexOf(currentStep) === steps.length - 1;
    
    // Lazy initi
    const nextStep = () => {
        if (isLastStep) {
            finishOnboarding();
        } else {
            setStep(steps[steps.indexOf(currentStep) + 1].id);
            setIsThinking(false);
        }
    };
    const previousStep = () => {
        setStep(steps[steps.indexOf(currentStep) - 1].id);
        setIsThinking(false);
    };

    const setStepWithThinkingReset = (newStep: string) => {
        setStep(newStep);
        setIsThinking(false);
    };

    return {
        steps,
        currentStep,
        nextStep,
        previousStep,
        isFirstStep,
        isLastStep,
        setStep: setStepWithThinkingReset,
    };
};