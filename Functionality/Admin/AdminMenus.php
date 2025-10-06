<?php

namespace SuggerenceOnboarding\Functionality\Admin;

class AdminMenus
{

    protected $plugin_name;
    protected $plugin_version;

    public function __construct($plugin_name, $plugin_version)
    {
        $this->plugin_name = $plugin_name;
        $this->plugin_version = $plugin_version;

        add_action('admin_menu', [$this, 'add_admin_menus']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
    }

    public function add_admin_menus()
    {
        add_menu_page(
            'Suggerence Onboarding',
            'Suggerence Onboarding',
            'manage_options',
            'suggerence-onboarding',
            [$this, 'render_onboarding_page'],
            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9Ijk4IgogICBoZWlnaHQ9Ijk4IgogICB2aWV3Qm94PSIwIDAgOTggOTcuOTk5OTk3IgogICBmaWxsPSJub25lIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTpkb2NuYW1lPSJzdWdnZXJlbmNlLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS40LjIgKGViZjBlOTQwZDAsIDIwMjUtMDUtMDgpIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMyIiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MiIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIGlua3NjYXBlOnpvb209IjEuMDE4OTg3MyIKICAgICBpbmtzY2FwZTpjeD0iNjUxLjYyNzM2IgogICAgIGlua3NjYXBlOmN5PSI4NC4zOTc1MTkiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIyNTYwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk2NSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMzIiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmcyIiAvPgogIDxwYXRoCiAgICAgZD0ibSA1MS4yODc5MzEsOTEuMzU1NjE4IGMgLTcuMTkwMTQzLDAgLTEzLjU4Njc5LC0xLjIyNTQ0NCAtMTkuMTg4MiwtMy42ODA2NzkgQyAyNi40OTQ4NDQsODUuMjEzNjIxIDIyLjA2NzYsODEuODQyMzQ1IDE4LjgxODg2OSw3Ny41NTg1MDQgMTUuNTY2NjYxLDczLjI3NzI3MSAxMy43NDY3NDYsNjguNDc5Nzg2IDEzLjM1OTk5Miw2My4xNjM0NDMgaCAyNC45MzIxNDUgYyAwLjI5ODk3MywyLjg1MTU0OSAxLjYyOTU4LDUuMTY3NzI2IDMuOTkyNjg5LDYuOTM5ODQgMi4zNjMxMDksMS43NzU1OTEgNS4yNjE1ODksMi42NjEyMTMgOC43MDQxMzIsMi42NjEyMTMgMy4xNTA1MjIsMCA1LjU4NDg5NywtMC42MTQ0NiA3LjMwNjYwMywtMS44NDY4NTcgMS43MTczNjEsLTEuMjI4OTIxIDIuNTc5NTE3LC0yLjgyODA4MyAyLjU3OTUxNywtNC43OTQwMDggMCwtMi4zNjIyNCAtMS4yMzIzOTcsLTQuMTA3NDEyIC0zLjY5MzcxNSwtNS4yNDE0MjYgQyA1NC43MjY5OTgsNTkuNzUxNzU0IDUwLjc0NDczOCw1OC40OTkwMiA0NS4yMzExMDcsNTcuMTIwNjEyIDM5LjMyNzI0Niw1NS43MzU1MTIgMzQuNDA4MDg2LDU0LjI4MjQ0OCAzMC40NzAxNTEsNTIuNzYxNTA2IDI2LjUzOTE2OSw1MS4yNDA1NjUgMjMuMTQzNTU4LDQ4LjgzMzU2NiAyMC4yODUwNTcsNDUuNTM3MDMzIDE3LjQzMzUwOCw0Mi4yMzM3MjIgMTYuMDA3MywzNy43Nzk1MzYgMTYuMDA3MywzMi4xNzQ0NzUgYyAwLC00LjcyNTc4MyAxLjMwMzY2NCwtOS4wMzA1NyAzLjkxMDk5MiwtMTIuOTE0NDQ2IDIuNjA3MzI5LC0zLjg4Mzc5IDYuNDQzNTc4LC02Ljk1NjI2NiAxMS41MTU3MDIsLTkuMjIwNjQ0IDUuMDY4NjQ2LC0yLjI2MTA3NSAxMS4wOTUwNTIsLTMuMzk1MDAzIDE4LjA3NDg3LC0zLjM5NTAwMyAxMC4zMzgwNTgsMCAxOC40ODI0ODMsMi41NTk3ODkgMjQuNDMwNjY5LDcuNjcyNTg2IDUuOTU0MjY4LDUuMTE2MTg3IDkuMzczMzQ2LDExLjkwNjEwNSAxMC4yNTI4ODUsMjAuMzY5NzU1IEggNjAuODc1MDc3IGMgLTAuMzkwMjMsLTIuODU4NTAyIC0xLjY0MjYxNywtNS4xMjI5NjcgLTMuNzYxNTA2LC02Ljc4OTkxOSAtMi4xMTgwMTgsLTEuNjczNzMxIC00Ljg5ODMwMSwtMi41MTIyNDggLTguMzM3MzY3LC0yLjUxMjI0OCAtMi45NTQxMDMsMCAtNS4yMTQ2NTcsMC41NjY5MjEgLTYuNzkwMzUyLDEuNjk3NDU4IC0xLjU3NDgyNywxLjEzMzkyNyAtMi4zNjMxMSwyLjY4MjA3MiAtMi4zNjMxMSw0LjY0NDM0OCAwLDIuMzYyODQ4IDEuMjUzMjU3LDQuMTM4NDM4IDMuNzYxNTA2LDUuMzIzMjk1IDIuNTE2MDcyLDEuMTc3OTkyIDYuNDI3MDY1LDIuMzU2MDY5IDExLjczMjk3OSwzLjUzMDc1OCA2LjEwMTE0OSwxLjU3NTI2MSAxMS4wNzE1ODcsMy4xMzAwOTggMTQuOTExMzEyLDQuNjU3ODE5IDMuODM2MjUsMS41MjA5NDEgNy4yMDQwNDksMy45Nzg5NTcgMTAuMTAzMzk4LDcuMzczODcyIDIuOTA1NDM0LDMuMzk1MDAzIDQuNDA2Mzg1LDcuOTQ0MTgzIDQuNTA4MDcxLDEzLjY0Nzk3NSAwLDQuODI3MDM0IC0xLjM1NDA3Myw5LjEzNTIxIC00LjA2MDQ3OSwxMi45MjgwMDQgLTIuNzA5MDE0LDMuNzg0OTcyIC02LjU5NjU0MSw2Ljc1OTA2NCAtMTEuNjY1MTg4LDguOTIxNDA5IC01LjA2MTY5MywyLjE2MzIxNCAtMTAuOTM4NjEyLDMuMjQ2MTI0IC0xNy42MjY0MSwzLjI0NjEyNCB6IgogICAgIGlkPSJwYXRoMSIKICAgICBzb2RpcG9kaTpub2RldHlwZXM9InNjY2NjY3Njc2NjY2NzY2NzY2NjY3Njc2NjY2NjY2NzIgogICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MC44NjkxMSIgLz4KPC9zdmc+Cg==',
            6
        );

    }

    public function render_onboarding_page()
    {
        echo '<div class="suggerence" id="suggerence-onboarding" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #FCFCFC; z-index: 100000;"></div>';
    }


    public function enqueue_scripts()
    {
        $screen = get_current_screen();

        if ($screen && (str_contains($screen->id, 'suggerence-onboarding'))) {
            wp_enqueue_script($this->plugin_name . '-onboarding',);
            wp_enqueue_style($this->plugin_name . '-onboarding',);
        }
    }
}
