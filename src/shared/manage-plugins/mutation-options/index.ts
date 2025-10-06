import { installPlugin, updatePluginStatus } from '../api';

export function installPluginMutationOptions() {
    return {
        mutationFn: (args: { pluginSlug: string, status: string }) => {
            return installPlugin(args)
        }
    }
}

export function updatePluginStatusMutationOptions() {
    return {
        mutationFn: (args: { pluginSlug: string, status: string, plugin: string }) => {
            return updatePluginStatus(args)
        }
    }
}

// export function activatePluginMutationOptions() {
//     return {
//         mutationFn: (pluginDir: string) => {
//             return activatePlugin(pluginDir)
//         }
//     }
// }

// export function deletePluginMutationOptions() {
//     return {
//         mutationFn: (pluginDir: string) => {
//             return deletePlugin(pluginDir)
//         }
//     }
// }

// export function deactivatePluginMutationOptions() {
//     return {
//         mutationFn: (pluginDir: string) => {
//             return deactivatePlugin(pluginDir)
//         }
//     }
// }