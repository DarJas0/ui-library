<?php

namespace UiLibrary\SymfonyAdapter\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class UiComponentExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('ui_component', [$this, 'renderUiComponent'], ['is_safe' => ['html']]),
        ];
    }

    public function renderUiComponent(string $name, array|object $props = []): string
    {
        $propsArray = $this->normalizeProps($props);
        $propsJson = json_encode($propsArray, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        return sprintf(
            '<div data-ui-component="%s" data-ui-props="%s"></div>',
            htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
            htmlspecialchars($propsJson, ENT_QUOTES, 'UTF-8')
        );
    }

    private function normalizeProps(array|object $props): array
    {
        if (is_object($props)) {
            if (method_exists($props, 'toArray')) {
                return $props->toArray();
            }

            if ($props instanceof \stdClass) {
                return (array) $props;
            }
        }

        return $props;
    }
}
