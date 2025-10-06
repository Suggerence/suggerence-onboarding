// @ts-nocheck
import { ReactComponent as ActiveGradient } from './active.svg';
import { ReactComponent as InactiveGradient } from './inactive.svg';

import { useThinkingStore } from '../../stores/thinkingStore';

export const ThinkingGradient = () => {
    const { isThinking, thinkingMessage } = useThinkingStore();
    return (
        <div className={`h-screen w-screen fixed top-0 left-0 -z-20 flex justify-center items-center ${isThinking ? 'animate-pulse animate-ping' : ''}`}>
            {isThinking ? <ActiveGradient className="w-full h-full max-w-none" /> : <InactiveGradient className="w-full h-full max-w-none" />}
            {(isThinking && thinkingMessage) && <div className="animate-pulse absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-neutral-500 text-base">{thinkingMessage}</div>}
        </div>
    )
}