// External libraries
import { useMutation, useQuery } from "@tanstack/react-query";
import { __, sprintf } from "@wordpress/i18n";

// Internal imports - alphabetical order
import { installPluginMutationOptions, updatePluginStatusMutationOptions } from "@/shared/manage-plugins/mutation-options";
import { installThemeMutationOptions, switchThemeMutationOptions } from "@/shared/manage-themes/mutation-options";
import { getSitePluginsQueryOptions, getSiteSettingsQueryOptions } from "@/shared/site-data/query-options";
import { getSuggerencePackagesQueryOptions } from "@/shared/suggerence-packages/query-options";

// Local imports - alphabetical order
import { useOnboardingReset } from "./useOnboardingReset";
import { usePluginSessionStore } from "../stores/pluginSessionStore";
import { useSelectedPackageStore } from "../stores/selectedPackageStore";
import { useThinkingStore } from "../stores/thinkingStore";

declare const SuggerenceOnboardingData: SuggerenceOnboardingData;

export const useFinishOnboarding = () => {
    // Query hooks
    const { data: siteData } = useQuery(getSiteSettingsQueryOptions());
    const { data: packages } = useQuery(getSuggerencePackagesQueryOptions());
    const { data: sitePlugins } = useQuery(getSitePluginsQueryOptions());
    
    // Store hooks
    const { selectedPackage } = useSelectedPackageStore();
    const { reset } = useOnboardingReset();
    const { setThinkingMessage, setIsThinking, setIsBlocked } = useThinkingStore();
    const { pluginSession } = usePluginSessionStore();

    // Mutation hooks
    const { mutateAsync: installPluginMutate } = useMutation(installPluginMutationOptions());
    const { mutateAsync: updatePluginStatusMutate } = useMutation(updatePluginStatusMutationOptions());
    const { mutateAsync: installThemeMutate } = useMutation(installThemeMutationOptions());
    const { mutateAsync: switchThemeMutate } = useMutation(switchThemeMutationOptions());
    
    // Computed values
    const packageData = packages?.find((pkg) => pkg.name === selectedPackage);
    const redirectUrl = (siteData?.url && packageData?.redirect_url) ? `${siteData.url}${packageData?.redirect_url}` : SuggerenceOnboardingData.wp_admin_url;

    const neededPlugins = [
        ...(pluginSession?.session?.accepted_plugins.map((plugin) => plugin.slug) || []),
        ...(packageData?.plugins || [])
    ];

    const pluginsToInstall = neededPlugins?.filter((plugin) =>
        !sitePlugins?.some((sitePlugin) => sitePlugin.plugin.split('/')[0] === plugin)
    ) || [];    

    const pluginsToUpdate = neededPlugins?.filter((plugin) =>
        sitePlugins?.some((sitePlugin) => 
            sitePlugin.plugin.split('/')[0] === plugin && sitePlugin.status !== 'active'
        )
    ) || [];

    // Handler functions
    const handleInstallingPlugins = async () => {
        if (pluginsToInstall.length > 0) {
            for (const plugin of pluginsToInstall) {
                try {
                    setThinkingMessage(__('Installing plugins...', 'suggerence-onboarding'));
                    await installPluginMutate({ pluginSlug: plugin, status: 'active' });
                } catch (error) {
                    // do nothing
                }
            }
        }
    }

    const handleUpdatingPluginStatus = async () => {
        if (pluginsToUpdate.length > 0) {
            for (const pluginSlug of pluginsToUpdate) {
                try {
                    const plugin = sitePlugins?.find((sitePlugin) => sitePlugin.plugin.split('/')[0] === pluginSlug);
                    setThinkingMessage(__('Activating plugins...', 'suggerence-onboarding'));
                    await updatePluginStatusMutate({ pluginSlug: pluginSlug, status: 'active', plugin: plugin?.plugin || '' });
                } catch (error) {
                    // do nothing
                }
            }
        }
    }

    const handleInstallingTheme = async () => {
        if (packageData?.theme) {
            try {
                setThinkingMessage(__('Installing theme...', 'suggerence-onboarding'));
                await installThemeMutate(packageData?.theme);
            } catch (error) {
                // do nothing
            }
        }
    }

    const handleSwitchingTheme = async () => {
        if (packageData?.theme) {
            try {
                setThinkingMessage(__('Switching theme...', 'suggerence-onboarding'));
                await switchThemeMutate(packageData?.theme);
            } catch (error) {
                // do nothing
            }
        }
    }

    const handleRedirecting = () => {
        setThinkingMessage(__('Redirecting back to the site...', 'suggerence-onboarding'));
        reset();
        window.location.href = redirectUrl;
    }

    const finishOnboarding = async () => {
        setIsThinking(true);
        setIsBlocked(true);
        await handleInstallingPlugins();
        await handleUpdatingPluginStatus();
        await handleInstallingTheme();
        await handleSwitchingTheme();
        handleRedirecting()
    };

    return {
        finishOnboarding,
    };
}