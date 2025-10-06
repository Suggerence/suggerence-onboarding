
interface ContributorProfile {
    avatar: string;
    profile: string;
    display_name: string;
}

interface Ratings {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
}

interface Screenshot {
    src: string;
    caption: string;
}

interface Sections {
    faq?: string;
    reviews?: string;
    changelog?: string;
    description?: string;
    screenshots?: string;
    installation?: string;
}

interface LanguagePack {
    slug: string;
    type: string;
    package: string;
    updated: string;
    version: string;
    language: string;
}

interface Banners {
    low: string;
    high: string;
}

interface Icons {
    "1x"?: string;
    "2x"?: string;
    svg?: string;
}

interface Block {
    name: string;
    title: string;
}

interface WordPressPlugin {
    // Basic plugin information
    name: string;
    slug: string;
    version: string;
    author: string;
    author_profile: string;

    // Plugin metadata
    contributors: Record<string, ContributorProfile>;
    requires: string; // WordPress version requirement
    tested: string; // WordPress version tested up to
    requires_php: boolean | string;
    requires_plugins: string[];

    // Ratings and reviews
    rating: number;
    ratings: Ratings;
    num_ratings: number;

    // Support information
    support_url: string;
    support_threads: number;
    support_threads_resolved: number;

    // Installation statistics
    active_installs: number;
    downloaded: number;

    // Dates
    last_updated: string; // Format: "YYYY-MM-DD H:mmam GMT"
    added: string; // Date string in YYYY-MM-DD format

    // URLs and links
    homepage: string;

    // Content sections
    sections: Sections;

    // Media assets
    screenshots: Record<string, Screenshot>;
    banners: Banners;
    icons?: Icons;

    // Gutenberg blocks (if applicable)
    blocks?: Record<string, Block>;
    block_assets: any[];
    author_block_count: number;
    author_block_rating: number;

    // Version management
    stable_tag: string;
    versions: Record<string, string>;
    upgrade_notice: string[];

    // Business information
    business_model: string | boolean | null;
    repository_url: string;
    commercial_support_url: string;
    donate_link: string;

    // Internationalization
    language_packs: LanguagePack[];

    // Other
    blueprints: any[];
    preview_link: string;

    //Premium plugins
    price: string | null;
}