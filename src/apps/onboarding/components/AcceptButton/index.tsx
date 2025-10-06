import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useSteps } from "../../hooks/useSteps";

export const AcceptButton = (props: { onClick?: () => void, isBusy?: boolean, disabled?: boolean }) => {

    const { nextStep } = useSteps();

    return (
        <Button className="!rounded-sm !text-base !px-5 !py-5" onClick={props.onClick ?? nextStep} variant="primary" isBusy={props.isBusy ?? false} disabled={props.disabled ?? false}>
            {__('Accept', 'suggerence-onboarding')}
        </Button>
    )
}