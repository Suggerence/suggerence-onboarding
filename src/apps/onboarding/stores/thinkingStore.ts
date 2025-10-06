import { create } from 'zustand';

interface ThinkingStore {
    isThinking : boolean;
    setIsThinking: (isThinking: boolean) => void;
    isBlocked: boolean;
    setIsBlocked: (isBlocked: boolean) => void;
    thinkingMessage: string;
    setThinkingMessage: (thinkingMessage: string) => void;
}

export const useThinkingStore = create<ThinkingStore>()((set) => ({
    isThinking: false,
    setIsThinking: (isThinking) => set({ isThinking }),
    isBlocked: false,
    setIsBlocked: (isBlocked) => set({ isBlocked }),
    thinkingMessage: '',
    setThinkingMessage: (thinkingMessage) => set({ thinkingMessage }),
}));