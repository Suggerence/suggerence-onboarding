import { useFeatureSessionStore } from "../../stores/featureSessionStore";
import { Heading } from "@/shared/ui/Heading";
import { Button } from "@wordpress/components";
import { check, close } from "@wordpress/icons";
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { AcceptButton } from "../AcceptButton";
import { refineFeatureSessionMutationOptions } from "@/shared/feature-sessions/mutation-options";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/shared/ui/Input";
import { useThinkingStore } from "../../stores/thinkingStore";

export const StepFeatures = () => {

    const { featureSession, setFeatureSession } = useFeatureSessionStore();
    const { setIsThinking } = useThinkingStore();
    const [discardedFeatures, setDiscardedFeatures] = useState<string[]>([]);
    const [additionalInstructions, setAdditionalInstructions] = useState<string>('');

    const { mutate: refineFeatureSession, isPending: isPendingRefineFeatureSession } = useMutation(refineFeatureSessionMutationOptions());

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!featureSession?.session_id) {
            return;
        }

        setIsThinking(true);

        refineFeatureSession({
            session_id: featureSession.session_id,
            discarded_feature_ids: discardedFeatures,
            additional_instructions: additionalInstructions,
        }, {
            onSuccess: (data) => {
                setFeatureSession(data);
                setDiscardedFeatures([]);
                setAdditionalInstructions('');
            }
        });
    }

    const handleDeleteDiscardedFeatures = () => {

        if (!featureSession?.session_id) {
            return;
        }

        setIsThinking(true);

        refineFeatureSession({
            session_id: featureSession.session_id,
            discarded_feature_ids: discardedFeatures,
            additional_instructions: '',
        }, {
            onSuccess: (data) => {
                setFeatureSession(data);
                setDiscardedFeatures([]);
            }
        });
    }


    return (
        <div className="grow flex flex-col w-[1080px] max-w-full px-4 gap-4 overflow-y-auto">

            <div className="flex items-start justify-between">
                <div>
                    <Heading>{__('Suggested Features', 'suggerence-onboarding')}</Heading>

                    <p className="!text-base !my-0">{__('Here are the selected features, remove any you don’t want', 'suggerence-onboarding')}</p>
                </div>

                <AcceptButton disabled={discardedFeatures.length > 0  || isPendingRefineFeatureSession} />
            </div>

            <div className={`flex justify-end ${discardedFeatures.length === 0 ? 'opacity-0' : ''}`}>
                <Button
                    onClick={() => {
                        handleDeleteDiscardedFeatures();
                    }}
                    className="!border !border-red-500 !text-red-500"
                    disabled={discardedFeatures.length === 0}
                    isBusy={isPendingRefineFeatureSession}
                >
                    {__('Delete discarded features', 'suggerence-onboarding')}
                </Button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto min-h-0">

                <div className="grid grid-cols-1 gap-2">
                    {
                        featureSession?.features.map((feature) => (
                            <div key={feature.id} className={`bg-white p-6 flex items-center justify-between gap-6 ${!discardedFeatures.includes(feature.id) ? 'opacity-75' : ''}`}>
                                <div className="flex-1 max-w-[500px]">
                                    <Heading size="sm" as="h2">{feature.feature_translation}</Heading>
                                    <p className="!text-base !mb-0">{feature.explanation_translation}</p>
                                </div>

                                <div>

                                    <div className="">
                                        <Button 
                                            onClick={() => {
                                                if (!discardedFeatures.includes(feature.id)) {
                                                    setDiscardedFeatures([...discardedFeatures, feature.id]);
                                                } else {
                                                    setDiscardedFeatures(discardedFeatures.filter((id) => id !== feature.id));
                                                }
                                            }} 
                                            className={`!border ${discardedFeatures.includes(feature.id) ? '!border-red-500 !text-red-500' : ''}`} 
                                            icon={!discardedFeatures.includes(feature.id) ? check : close} 
                                            disabled={isPendingRefineFeatureSession}
                                        ></Button>
                                    </div>

                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={additionalInstructions}
                        placeholder={__('Refine features with more details', 'suggerence-onboarding')}
                        onChange={(value) => {
                            setAdditionalInstructions(value);
                        }}
                        required
                        disabled={isPendingRefineFeatureSession}
                    />
                </form>
            </div>

        </div>
    )
}