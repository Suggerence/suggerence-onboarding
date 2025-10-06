interface FeatureSessionRequest {
    user_description: string;
    site_title?: string;
    site_description?: string;
    site_plugins?: string[];
    site_locale?: string;
}

interface Feature {
    id: string;
    feature: string;
    feature_translation: string;
    explanation: string;
    explanation_translation: string;
}

interface ConversationHistory {
    id: string;
    session_id: string;
    type: string;
    features_generated: Feature[];
    created_at: string;
}

interface FeatureSession {
    session_id: string;
    features: Feature[];
    conversation_history: ConversationHistory[];
}

interface RefineFeatureSessionRequest {
    session_id: string;
    discarded_feature_ids: string[];
    additional_instructions: string;
}