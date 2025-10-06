interface PluginInsights {
    summary: string;
    features: string[];
    main_purpose: string;
    complexity_level: string;
    category: string;
    tags: string[];
}

interface PluginSession { 
    session_id: string;
    plugin: {
        slug: string;
        insights: PluginInsights;
        features: string[];
    },
    session: {
        features_pending: string[];
        features_covered: string[];
        accepted_plugins: {
            accepted_at: string;
            features_covered: string[];
            insights: PluginInsights;
            slug: string;
        }[];
        discarded_plugins: string[];
        is_complete: boolean;
    }
}


interface HandlePluginRequest {
    session_id: string;
    action: 'accept' | 'discard' | 'discard_accepted';
    plugin_slug?: string;
}