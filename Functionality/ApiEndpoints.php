<?php

namespace SuggerenceOnboarding\Functionality;

use PluboRoutes\Endpoint\GetEndpoint;
use PluboRoutes\Endpoint\PostEndpoint;
use PluboRoutes\Endpoint\PutEndpoint;
use PluboRoutes\Endpoint\DeleteEndpoint;

class ApiEndpoints
{

    protected $plugin_name;
    protected $plugin_version;

    public function __construct($plugin_name, $plugin_version)
    {
        $this->plugin_name = $plugin_name;
        $this->plugin_version = $plugin_version;
        add_filter('plubo/endpoints', [$this, 'add_endpoints']);
    }

    /**
     * Define onboarding endpoints
     */
    public function add_endpoints()
    {
        $endpoints = [];

        // Theme switching endpoint
        $endpoints[] = new PostEndpoint(
            'suggerence-onboarding/v1',
            'themes/switch',
            [$this, 'switch_theme'],
            function() {
                return current_user_can('manage_options');
            }
        );

        return $endpoints;
    }

    /**
     * Switch theme handler
     */
    public function switch_theme($request)
    {
        // SchemaValidator middleware has already validated and sanitized the input
        $theme_slug = $request->get_param('theme');

        if (empty($theme_slug)) {
            return new WP_Error(400, esc_html__('Theme slug is required.', 'suggerence-onboarding'));
        }

        $theme = wp_get_theme($theme_slug);

        if (!$theme->exists() || !$theme->is_allowed()) {
            return new WP_Error(404, esc_html__('The requested theme does not exist or is not allowed.', 'suggerence-onboarding'));
        }

        // Switch the theme
        $previous_theme = get_option('stylesheet');
        switch_theme($theme->get_stylesheet());

        return new WP_REST_Response([
            'previous_theme' => $previous_theme,
            'new_theme' => $theme->get_stylesheet(),
            'theme_name' => $theme->get('Name')
        ], esc_html__('Theme switched successfully', 'suggerence-onboarding'));
    }

    /**
     * Get current theme information
     */
    public function get_current_theme($request)
    {
        $current_theme = wp_get_theme();

        return new WP_REST_Response([
            'stylesheet' => $current_theme->get_stylesheet(),
            'name' => $current_theme->get('Name'),
            'description' => $current_theme->get('Description'),
            'version' => $current_theme->get('Version'),
            'author' => $current_theme->get('Author'),
            'screenshot' => $current_theme->get_screenshot(),
            'is_active' => true
        ]);
    }

    /**
     * Get available themes
     */
    public function get_available_themes($request)
    {
        if (!current_user_can('switch_themes')) {
            return new WP_Error(403, esc_html__('You do not have permission to view themes.', 'suggerence-onboarding'));
        }

        $themes = wp_get_themes(['allowed' => true]);
        $current_theme = get_stylesheet();

        $theme_list = [];
        foreach ($themes as $stylesheet => $theme) {
            $theme_list[] = [
                'stylesheet' => $stylesheet,
                'name' => $theme->get('Name'),
                'description' => $theme->get('Description'),
                'version' => $theme->get('Version'),
                'author' => $theme->get('Author'),
                'screenshot' => $theme->get_screenshot(),
                'is_active' => $stylesheet === $current_theme
            ];
        }

        return new WP_REST_Response([
            'themes' => $theme_list,
            'current_theme' => $current_theme,
            'total_count' => count($theme_list)
        ]);
    }
}
