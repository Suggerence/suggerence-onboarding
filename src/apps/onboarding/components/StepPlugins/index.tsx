import { useMutation, useQuery } from "@tanstack/react-query";
import { useFeatureSessionStore } from "../../stores/featureSessionStore";
import { Heading } from "@/shared/ui/Heading";
import { useThinkingStore } from "../../stores/thinkingStore";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { decodeEntities } from '@wordpress/html-entities';
import { getPluginDataQueryOptions } from "@/shared/plugin-data/query-options";
import { createPluginSessionMutationOptions } from "@/shared/plugin-sessions/mutation-options";
import { usePluginSessionStore } from "../../stores/pluginSessionStore";
import { extractChildrenFromTag } from "@/shared/utils/html";
import { check, download, Icon, starEmpty, starFilled, lifesaver, upload, wordpress, lineSolid } from "@wordpress/icons";
import { ProseContent } from "@/shared/ui/ProseContent";
import { autop } from "@wordpress/autop";
import { AcceptButton } from "../AcceptButton";
import { Button } from "@wordpress/components";
import { formatDate } from "@/shared/utils/formatting";
import { handlePluginSessionMutationOptions } from "@/shared/plugin-sessions/mutation-options";
import { useSteps } from "../../hooks/useSteps";

export const StepPlugins = () => {

    const { featureSession } = useFeatureSessionStore();
    const { pluginSession } = usePluginSessionStore();
    const { nextStep } = useSteps();

    const { mutate: createPluginSession, isPending: isPendingCreatePluginSession } = useMutation({
        ...createPluginSessionMutationOptions(),
        onSuccess: (data) => {
            usePluginSessionStore.setState({ pluginSession: data });
        }
    });

    const { mutate: handlePluginRequest, isPending: isPendingPluginRequest } = useMutation({
        ...handlePluginSessionMutationOptions(),
        onSuccess: (data) => {
            usePluginSessionStore.setState({ pluginSession: data });
        }
    });

    useEffect(() => {

        if (pluginSession?.session.is_complete) nextStep();

        if (featureSession?.session_id && !pluginSession?.session_id) {
            createPluginSession({ feature_session_id: featureSession.session_id });
        }
    }, [featureSession, pluginSession]);

    const { isThinking, setIsThinking, setThinkingMessage } = useThinkingStore();

    const { data: pluginData, isLoading: isLoadingPluginData } = useQuery(getPluginDataQueryOptions([pluginSession?.plugin?.slug || '']));

    useEffect(() => {
        setIsThinking(isPendingCreatePluginSession || isLoadingPluginData || isPendingPluginRequest);

        if (isPendingCreatePluginSession) {
            setThinkingMessage(__('Creating plugin session...', 'suggerence-onboarding'));
        }
        if (isLoadingPluginData) {
            setThinkingMessage(__('Loading plugin data...', 'suggerence-onboarding'));
        }
        if (isPendingPluginRequest) {
            setThinkingMessage(__('Requesting plugin data...', 'suggerence-onboarding'));
        }

    }, [isPendingCreatePluginSession, isLoadingPluginData, isPendingPluginRequest]);

    const handleAcceptPlugin = () => {
        if (!pluginSession) return;
        
        handlePluginRequest({
            session_id: pluginSession.session_id,
            action: 'accept',
        });
    }

    const handleDiscardPlugin = () => {
        if (!pluginSession) return;

        handlePluginRequest({
            session_id: pluginSession.session_id,
            action: 'discard',
        });
    }

    const plugin = pluginData?.[0];
    const insights = pluginSession?.plugin?.insights;

    if (isThinking) return

    return (
        <div className="grow flex flex-col w-[1700px] max-w-full max-h-full px-4 gap-4 overflow-hidden">
            {
                pluginSession && plugin && insights && (
                    <>
                        <div className="grid grid-cols-12 gap-6 grow flex-1 max-h-full">

                            <div className="col-span-3 order-last md:order-first">

                                <div className="sticky top-0">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <Heading className="!mb-0" size="sm" as="h3">{__('Features', 'suggerence-onboarding')}</Heading>                                        

                                            <div className="grid grid-cols-1 gap-4">
                                                {
                                                    pluginSession.plugin.features.map((feature) => (
                                                        <div key={feature} className="flex flex-wrap items-center gap-2">
                                                            <Icon className="!fill-green-600 border border-green-600 rounded-full p-0" icon={check} size={20} />
                                                            <span className="bg-white text-sm border border-green-600 text-green-600 rounded-lg px-2 py-1 capitalize">{feature}</span>
                                                        </div>
                                                    ))
                                                }

                                                {
                                                    pluginSession.session.features_pending
                                                        .filter((feature) => !pluginSession.plugin.features.includes(feature))
                                                        .map((feature) => (
                                                            <div key={feature} className="flex flex-wrap items-center gap-2">
                                                                <Icon className="!fill-neutral-400" icon={lineSolid} size={20} />
                                                                <span className="bg-white text-sm border border-neutral-400 rounded-lg px-2 py-1 capitalize text-neutral-400">{feature}</span>
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <Heading className="!mb-0" size="sm" as="h3">{__('Details', 'suggerence-onboarding')}</Heading>

                                            <div className="pl-2 grid grid-cols-1 gap-4">
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <span className="text-sm font-medium">{__('License', 'suggerence-onboarding')}</span>
                                                    <span className="bg-white text-sm border border-neutral-800 rounded-lg px-2 py-0 capitalize">{plugin.business_model || __('Community', 'suggerence-onboarding')}</span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4">
                                                    <span className="text-sm font-medium">{__('Difficulty', 'suggerence-onboarding')}</span>
                                                    <span className="bg-white text-sm border border-neutral-800 rounded-lg px-2 py-0 capitalize">{insights.complexity_level}</span>
                                                </div>
                                            </div>

                                            <div className="pl-2 grid grid-cols-1 gap-4">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Icon className="!fill-green-600" icon={upload} size={20} />
                                                    <span className="text-sm font-normal text-green-600">{__('Updated', 'suggerence-onboarding')}</span>
                                                    <span className="text-neutral-400 text-sm">{formatDate(plugin.last_updated)}</span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Icon className="!fill-green-600" icon={lifesaver} size={20} />
                                                    <span className="text-sm font-normal text-green-600">{__('Support', 'suggerence-onboarding')}</span>
                                                    <span className="text-neutral-400 text-sm">{((plugin.support_threads_resolved/plugin.support_threads)*100).toFixed(0)}%</span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Icon className="!fill-green-600" icon={wordpress} size={20} />
                                                    <span className="text-sm font-normal text-green-600">{__('Version', 'suggerence-onboarding')}</span>
                                                    <span className="text-neutral-400 text-sm">{plugin.tested}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="col-span-8 grid grid-cols-1 gap-6 min-h-0">
                                <div className="flex flex-col gap-6 min-h-0 max-h-full overflow-y-auto">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <img className="w-12 h-12 object-contain" src={Object.values(plugin?.icons || {})[0] as string} alt={plugin.name} />
                                        </div>

                                        <div>
                                            <Heading className="!mb-0">{decodeEntities(plugin.name)}</Heading>

                                            <div className="flex items-center gap-4">
                                                <p className="!text-base !my-0">{__('Made by', 'suggerence-onboarding')} {extractChildrenFromTag(plugin.author, 'a')}</p>
                                                
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        {Array.from({ length: 5 }, (_, index) => (
                                                            <Icon
                                                                key={index}
                                                                size={20}
                                                                icon={index < Math.round(plugin.rating / 20) ? starFilled : starEmpty}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="!text-sm !font-medium !my-0 !py-0">{plugin.rating/10}/10</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-6 min-h-0 overflow-y-auto">
                                        <ProseContent content={autop(insights.main_purpose)} />

                                        {
                                            insights.features && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {
                                                        Object.entries(insights.features).map(([key, value]) => (
                                                            <div key={key} className="flex items-center gap-2">
                                                                <Icon icon={check} size={20} />
                                                                <ProseContent content={value} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }

                                        <ProseContent content={autop(insights.summary)} />
                                    </div>

                                    <div className="h-[200px]">
                                        {
                                            plugin.screenshots[1]?.src && (
                                                <img className="w-full h-full object-cover object-top" src={plugin.screenshots[1]?.src} alt={plugin.name} />
                                            )
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className="col-span-1">
                                <div className="sticky top-0">
                                    <div className="flex flex-col gap-4 items-end">
                                        <AcceptButton onClick={handleAcceptPlugin} />
                                        <Button variant="tertiary" onClick={handleDiscardPlugin}>{__('Discard', 'suggerence-onboarding')}</Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                )
            }
        </div>
    );
};