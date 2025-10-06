<?php

/**
 * @wordpress-plugin
 * Plugin Name:       Suggerence Onboarding
 * Plugin URI:        https://suggerence.com/
 * Description:       An AI Onboarding Experience for WordPress Sites.
 * Version:           0.1.0
 * Author:            Sirvelia
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:       suggerence-onboarding
 * Requires Plugins:
 */

if (!defined('WPINC')) {
    die('YOU SHALL NOT PASS!');
}

// PLUGIN CONSTANTS
define('SUGGERENCE_ONBOARDING_NAME', 'suggerence-onboarding');
define('SUGGERENCE_ONBOARDING_VERSION', '0.1.0');
define('SUGGERENCE_ONBOARDING_PATH', plugin_dir_path(__FILE__));
define('SUGGERENCE_ONBOARDING_BASENAME', plugin_basename(__FILE__));
define('SUGGERENCE_ONBOARDING_URL', plugin_dir_url(__FILE__));

// AUTOLOAD
if (file_exists(SUGGERENCE_ONBOARDING_PATH . 'vendor/autoload.php')) {
    require_once SUGGERENCE_ONBOARDING_PATH . 'vendor/autoload.php';
}

// LYFECYCLE
register_activation_hook(__FILE__, [SuggerenceOnboarding\Includes\Lyfecycle::class, 'activate']);
register_deactivation_hook(__FILE__, [SuggerenceOnboarding\Includes\Lyfecycle::class, 'deactivate']);
register_uninstall_hook(__FILE__, [SuggerenceOnboarding\Includes\Lyfecycle::class, 'uninstall']);

// LOAD ALL FILES
$loader = new SuggerenceOnboarding\Includes\Loader();
