<?php

namespace SuggerenceOnboarding\Includes;

use ReflectionClass;

class Loader
{
    public function __construct()
    {
        $this->load_dependencies();

        add_action('after_setup_theme', [$this, 'load_plubo_routes']);
    }

    private function load_dependencies(): void
    {

        // FUNCTIONALITY CLASSES
        $this->instantiate_classes_in_dir(
            SUGGERENCE_ONBOARDING_PATH . 'Functionality/*.php',
            '\\SuggerenceOnboarding\\Functionality\\'
        );

        // ADMIN FUNCTIONALITY
        if (is_admin()) {
            $this->instantiate_classes_in_dir(
                SUGGERENCE_ONBOARDING_PATH . 'Functionality/Admin/*.php',
                '\\SuggerenceOnboarding\\Functionality\\Admin\\'
            );
        }
    }

    /**
     * Instantiate all concrete classes in a directory pattern under a given namespace prefix.
     * - Skips abstract classes and interfaces.
     * - If constructor requires 0 params, calls it with none.
     * - Else tries ($name, $version).
     */
    private function instantiate_classes_in_dir(string $globPattern, string $nsPrefix): void
    {
        foreach (glob($globPattern) as $filename) {
            $basename   = basename($filename, '.php');
            $class_name = $nsPrefix . $basename;

            // Let Composer map it; don't require the file manually.
            if (!class_exists($class_name)) {
                // Not autoloadable; skip quietly.
                continue;
            }

            try {
                $rc = new ReflectionClass($class_name);

                // ❌ Never instantiate abstract classes or interfaces
                if ($rc->isAbstract() || $rc->isInterface()) {
                    continue;
                }

                // Decide how to construct
                $ctor = $rc->getConstructor();
                if ($ctor === null || $ctor->getNumberOfRequiredParameters() === 0) {
                    $rc->newInstance();
                } else {
                    // Your classes typically accept ($name, $version)
                    $rc->newInstance(SUGGERENCE_ONBOARDING_NAME, SUGGERENCE_ONBOARDING_VERSION);
                }
            } catch (\Throwable $e) {
                continue;
            }
        }
    }

    public function load_plubo_routes(): void
    {
        \PluboRoutes\RoutesProcessor::init();
    }
}
