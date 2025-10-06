import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface FeatureSessionStore {
    featureSession: FeatureSession | null;
    setFeatureSession: (featureSession: FeatureSession) => void;
}

export const useFeatureSessionStore = create<FeatureSessionStore>()(
    persist(
        (set) => ({
            featureSession: null,
            setFeatureSession: (featureSession) => set((state) => ({ featureSession })),
        }),
        {
            name: 'feature-session',
            storage: createJSONStorage(() => localStorage),
        }
    )
);