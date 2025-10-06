
import { useUserChoicesStore } from "@/apps/onboarding/stores/userChoicesStore";
import { useSteps } from "../../hooks/useSteps";
import { getSitePluginsSlugsQueryOptions, getSiteSettingsQueryOptions } from "@/shared/site-data/query-options";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeatureSessionMutationOptions } from "@/shared/feature-sessions/mutation-options";
import { useFeatureSessionStore } from "../../stores/featureSessionStore";
import { __ } from "@wordpress/i18n";
import { useEffect, useRef } from "@wordpress/element";
import { Input } from "@/shared/ui/Input";
import { useThinkingStore } from "../../stores/thinkingStore";
import { usePluginSessionStore } from "../../stores/pluginSessionStore";

export const StepUserPrompts = () => {

    const queryClient = useQueryClient();

    const { setFeatureSession } = useFeatureSessionStore();
    const { resetPluginSession } = usePluginSessionStore();
    const { userDescription, setUserDescription } = useUserChoicesStore();

    const { mutate: createFeatureSession, isPending: isPendingCreateFeatureSession } = useMutation(createFeatureSessionMutationOptions());

    const { nextStep } = useSteps();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCreateFeatureSession = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { setIsThinking, setThinkingMessage } = useThinkingStore.getState();

        const sitePlugins = await queryClient.fetchQuery(getSitePluginsSlugsQueryOptions());
        const siteSettings = await queryClient.fetchQuery(getSiteSettingsQueryOptions());

        if (!siteSettings) {
            return;
        }

        setIsThinking(true);

        createFeatureSession({
            user_description: userDescription,
            site_title: siteSettings.title,
            site_description: siteSettings.description,
            site_plugins: sitePlugins.map((plugin) => plugin.plugin.split('/')[0]),
            site_locale: siteSettings.language,
        }, {
            onSuccess: (data) => {
                setFeatureSession(data);
                resetPluginSession();
                nextStep();
            },
        });
    }

    return (
        <div className="grow w-[600px] max-w-full px-4 flex items-center">
            <div className="flex-1">
                <form onSubmit={handleCreateFeatureSession}>
                    <Input
                        value={userDescription}
                        onChange={(value) => setUserDescription(value)}
                        placeholder={__('What you want to build?', 'suggerence-onboarding')}
                        ref={inputRef}
                        required
                        disabled={isPendingCreateFeatureSession}
                    />
                </form>
            </div>
        </div>
    )
}