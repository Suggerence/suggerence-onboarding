import { createPluginSession, handlePluginSession } from "../api";

export const createPluginSessionMutationOptions = () => {
    return {
        mutationFn: (args: { feature_session_id: string }) => {
            return createPluginSession(args)
        }
    }
}

export const handlePluginSessionMutationOptions = () => {
    return {
        mutationFn: (args: HandlePluginRequest) => {
            return handlePluginSession(args)
        }
    }
}