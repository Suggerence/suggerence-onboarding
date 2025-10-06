import { getPluginDataQueryOptions } from "@/shared/plugin-data/query-options";
import { usePluginSessionStore } from "@/apps/onboarding/stores/pluginSessionStore";
import { useQuery } from "@tanstack/react-query";
import { Heading } from "@/shared/ui/Heading";
import { check, Icon } from "@wordpress/icons";
import { decodeEntities } from "@wordpress/html-entities";

export const AcceptedPlugin = ({ pluginSlug }: { pluginSlug: string }) => {

    const { pluginSession } = usePluginSessionStore();
    const { data: pluginData } = useQuery(getPluginDataQueryOptions([pluginSlug]));

    const plugin = pluginData?.[0];
    const insights = pluginSession?.session.accepted_plugins.find((plugin) => plugin.slug === pluginSlug)?.insights;

    return (
        <div className="bg-white p-6 flex items-center justify-between gap-6">
            <div className="flex-1">
                <Heading size="sm" as="h2">{decodeEntities(plugin?.name || '')}</Heading>
                <p className="!text-base !mb-0">{insights?.main_purpose}</p>
            </div>

            <div className="">
                <Icon className="!fill-green-600" size={30} icon={check} />
            </div>
        </div>
    )
}