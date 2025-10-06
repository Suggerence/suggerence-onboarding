import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface StepStore {
    step: string;
    setStep: (step: string) => void;
}

export const useStepStore = create<StepStore>()(
    persist(
        (set) => ({
            step: 'user-prompts',
            setStep: (step) => set({ step }),
        }),
        {
            name: 'step',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
