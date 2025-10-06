import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface SelectedPackageStore {
    selectedPackage: string;
    setSelectedPackage: (selectedPackage: string) => void;
}

export const useSelectedPackageStore = create<SelectedPackageStore>()(
    persist((set) => ({
        selectedPackage: '',
        setSelectedPackage: (selectedPackage) => set({ selectedPackage }),
    }), {
        name: 'selected-package',
        storage: createJSONStorage(() => localStorage),
    })
);