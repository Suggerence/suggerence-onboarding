import { queryOptions } from "@tanstack/react-query";
import { getFeatureSession } from "../api";

export const getFeatureSessionQueryOptions = (session_id: string) => {
    return queryOptions({
        queryKey: ['feature-session', 'get', session_id],
        queryFn: () => getFeatureSession(session_id),
        enabled: !!session_id,
    });
}