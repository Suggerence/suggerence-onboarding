import { createFeatureSession, refineFeatureSession } from "../api";

export const createFeatureSessionMutationOptions = () => {
    return {
        mutationFn: (args: FeatureSessionRequest) => {
            return createFeatureSession(args);
        },
    };
};

export const refineFeatureSessionMutationOptions = () => {
    return {
        mutationFn: (args: RefineFeatureSessionRequest) => {
            return refineFeatureSession(args);
        },
    };
};