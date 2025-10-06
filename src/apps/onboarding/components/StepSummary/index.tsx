import { Heading } from "@/shared/ui/Heading";
import { __ } from "@wordpress/i18n";
import { usePluginSessionStore } from "../../stores/pluginSessionStore";
import { check, Icon, lineSolid } from "@wordpress/icons";
import { AcceptButton } from "../AcceptButton";
import { useUserChoicesStore } from "../../stores/userChoicesStore";
import { AcceptedPlugin } from "./AcceptedPlugin";

export const StepSummary = () => {

    const { pluginSession } = usePluginSessionStore();
    const { userDescription } = useUserChoicesStore();

    return (
        <div className="grow w-[1700px] max-w-full px-4 max-h-full overflow-hidden flex flex-col">
            <div className="grid grid-cols-12 gap-6 grow flex-1 max-h-full">
                {
                    pluginSession && (
                        <>
                            <div className="col-span-3 order-last md:order-first">
                                <div className="grid grid-cols-1 gap-6 sticky top-0">
                                    <div className="grid grid-cols-1 gap-6">
                                        <Heading className="!mb-0" size="sm" as="h3">{__('Features', 'suggerence-onboarding')}</Heading>

                                        <div className="grid grid-cols-1 gap-4">
                                            {
                                                pluginSession.session.features_covered.map((feature) => (
                                                    <div key={feature} className="flex flex-wrap items-center gap-2">
                                                        <Icon className="!fill-green-600 border border-green-600 rounded-full p-0" icon={check} size={20} />
                                                        <span className="bg-white text-sm border border-green-600 text-green-600 rounded-lg px-2 py-1 capitalize">{feature}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-span-8 grid grid-cols-1 gap-6 min-h-0">
                                <div className="flex flex-col gap-6 min-h-0 max-h-full overflow-y-auto">

                                    <div>
                                        <Heading className="!mb-0">{__('Summary', 'suggerence-onboarding')}</Heading>
                                    </div>

                                    <div className="bg-white/50 p-6">
                                        <p className="!text-base !my-0">{userDescription}</p>
                                    </div>

                                    <div className="flex-1 space-y-6 min-h-0 overflow-y-auto">
                                        {
                                            pluginSession.session?.accepted_plugins.map((plugin) => (
                                                <AcceptedPlugin key={plugin.slug} pluginSlug={plugin.slug} />
                                            ))
                                        }
                                    </div>

                                </div>

                            </div>

                            <div className="col-span-1">
                                <div className="sticky top-0 flex flex-col gap-4 items-end">
                                    <AcceptButton />
                                </div>
                            </div>

                        </>
                    )
                }
            </div>
        </div>
    )
}