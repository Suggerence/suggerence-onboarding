<?php

namespace SuggerenceOnboarding\Functionality\Admin;

class RegisterScripts
{

    protected $plugin_name;
    protected $plugin_version;

    public function __construct($plugin_name, $plugin_version)
    {
        $this->plugin_name = $plugin_name;
        $this->plugin_version = $plugin_version;

        add_action('admin_enqueue_scripts', [$this, 'register_scripts']);
    }

    public function register_scripts()
    {

        $suggerence_data = 'const SuggerenceOnboardingData = ' . wp_json_encode([
            'suggerence_api_url' => 'https://api.suggerence.com/v1',
            'locale' => get_locale(),
            'nonce' => wp_create_nonce('wp_rest'),
            'wp_admin_dashboard_url' => admin_url('index.php'),
            'admin_ajax_url' => admin_url('admin-ajax.php'),
            'updates_nonce' => wp_create_nonce('updates'),
            'site_url' => home_url(),
            'wp_admin_url' => admin_url(),
        ]) . ';';

        /**
         * Components
         */

        wp_register_style(
            $this->plugin_name . '-components',
            SUGGERENCE_ONBOARDING_URL . 'build/style-components.css',
            ['wp-components'],
            $this->plugin_version,
        );

        /**
         * Onboarding
         */

        $asset_file = include(SUGGERENCE_ONBOARDING_PATH . 'build/onboarding.asset.php');

        wp_register_script(
            $this->plugin_name . '-onboarding',
            SUGGERENCE_ONBOARDING_URL . 'build/onboarding.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            array(
                'in_footer' => true,
            )
        );

        wp_add_inline_script($this->plugin_name . '-onboarding', $suggerence_data);

        wp_register_style(
            $this->plugin_name . '-onboarding',
            SUGGERENCE_ONBOARDING_URL . 'build/style-onboarding.css',
            [$this->plugin_name . '-components'],
            $asset_file['version'],
        );

    }
}
