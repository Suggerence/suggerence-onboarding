import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserChoicesStore {
    userDescription: string;
    setUserDescription: (description: string) => void;
}

export const useUserChoicesStore = create<UserChoicesStore>()(
    persist(
        (set) => ({
    userDescription: '',
    setUserDescription: (description) => set((state) => ({ userDescription: description })),
}),
    {
        name: 'user-choices',
        storage: createJSONStorage(() => localStorage),
    }
));