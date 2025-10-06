import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface PluginSessionStore {
    pluginSession: PluginSession | null;
    setPluginSession: (pluginSession: PluginSession) => void;
    resetPluginSession: () => void;
}

export const usePluginSessionStore = create<PluginSessionStore>()(
    persist(
        (set) => ({
            pluginSession: null,
            setPluginSession: (pluginSession) => set((state) => ({ pluginSession })),
            resetPluginSession: () => set((state) => ({ pluginSession: null })),
        }),
        {
            name: 'plugin-session',
            storage: createJSONStorage(() => localStorage),
        }
    )
);