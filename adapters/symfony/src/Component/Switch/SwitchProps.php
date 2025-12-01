<?php

namespace UiLibrary\SymfonyAdapter\Component\Switch;

readonly class SwitchProps
{
    public function __construct(
        public ?bool $checked = null,
        public ?bool $defaultChecked = null,
        public ?string $color = null,
        public ?string $label = null,
        public ?string $className = null,
        public ?bool $disabled = null,
        public ?string $id = null,
        public ?string $ariaLabel = null,
        public ?string $ariaLabelledBy = null,
    ) {
    }

    public function toArray(): array
    {
        $props = [];

        if ($this->checked !== null) {
            $props['checked'] = $this->checked;
        }

        if ($this->defaultChecked !== null) {
            $props['defaultChecked'] = $this->defaultChecked;
        }

        if ($this->color !== null) {
            $props['color'] = $this->color;
        }

        if ($this->label !== null) {
            $props['label'] = $this->label;
        }

        if ($this->className !== null) {
            $props['className'] = $this->className;
        }

        if ($this->disabled !== null) {
            $props['disabled'] = $this->disabled;
        }

        if ($this->id !== null) {
            $props['id'] = $this->id;
        }

        if ($this->ariaLabel !== null) {
            $props['ariaLabel'] = $this->ariaLabel;
        }

        if ($this->ariaLabelledBy !== null) {
            $props['ariaLabelledBy'] = $this->ariaLabelledBy;
        }

        return $props;
    }
}
