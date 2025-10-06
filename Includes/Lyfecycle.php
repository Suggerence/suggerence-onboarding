<?php

namespace SuggerenceOnboarding\Includes;

class Lyfecycle
{
    public static function activate($network_wide)
    {
        do_action('SuggerenceOnboarding/setup', $network_wide);
    }

    public static function deactivate($network_wide)
    {
        do_action('SuggerenceOnboarding/deactivation', $network_wide);
    }

    public static function uninstall()
    {
        do_action('SuggerenceOnboarding/cleanup');
    }
}
