import { Header } from './components/Header';
import { StepUserPrompts } from './components/StepUserPrompts';
import { useSteps } from './hooks/useSteps';
import { StepFeatures } from './components/StepFeatures';
import { ThinkingGradient } from '@/apps/onboarding/components/ThinkingGradient';
import { StepPlugins } from './components/StepPlugins';
import { StepPackages } from './components/StepPackages';
import { useThinkingStore } from './stores/thinkingStore';
import { StepSummary } from './components/StepSummary';

export const Onboarding = () => {
    const { currentStep } = useSteps();
    const { isBlocked } = useThinkingStore();

    return (
        <>
            <Header />
            <ThinkingGradient />

            <section className={`py-20 flex flex-col items-center h-full max-h-full ${isBlocked ? 'opacity-0' : ''} ${currentStep.id === 'plugins' ? '!pb-0' : ''}`}>
                {
                    currentStep.id === 'user-prompts' && <StepUserPrompts />
                }
                {
                    currentStep.id === 'features' && <StepFeatures />
                }
                {
                    currentStep.id === 'plugins' && <StepPlugins />
                }
                {
                    currentStep.id === 'summary' && <StepSummary />
                }
                {
                    currentStep.id === 'packages' && <StepPackages />
                }
                {/* {
                    currentStep.id === '' && <div className="flex-1"></div>
                } */}
            </section>


        </>
    )
}