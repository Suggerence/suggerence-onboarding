import { Button, Icon } from "@wordpress/components"
import { __ } from "@wordpress/i18n"
import { chevronLeft } from "@wordpress/icons"
import { useSteps } from "../../hooks/useSteps"

declare const SuggerenceOnboardingData: SuggerenceOnboardingData;

export const Header = () => {
    const { currentStep, steps, previousStep, isFirstStep } = useSteps();

    const handleBack = () => {
        if (isFirstStep) {
            window.location.href = SuggerenceOnboardingData.wp_admin_url;
        } else {
            previousStep();
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 px-4 py-2 flex justify-between items-center">
            <Button onClick={handleBack}>
                <Icon icon={chevronLeft} />
                {__('Back', 'suggerence-onboarding')}
            </Button>

            <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">
                    Step {steps.indexOf(currentStep) + 1} of {steps.length}
                </div>
            </div>
        </div>
    )
}