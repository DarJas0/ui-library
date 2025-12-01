<?php

namespace UiLibrary\SymfonyAdapter\Component\CheckboxRadio;

readonly class CheckboxProps
{
    public function __construct(
        public ?string $id = null,
        public ?string $label = null,
        public ?string $helperText = null,
        public ?string $color = null,
        public ?string $className = null,
        public ?bool $disabled = null,
        public ?bool $checked = null,
        public ?string $name = null,
        public ?string $value = null,
        public ?bool $required = null,
        public ?string $ariaLabel = null,
        public ?string $ariaDescribedBy = null,
    ) {
    }

    public function toArray(): array
    {
        $props = [];

        if ($this->id !== null) {
            $props['id'] = $this->id;
        }

        if ($this->label !== null) {
            $props['label'] = $this->label;
        }

        if ($this->helperText !== null) {
            $props['helperText'] = $this->helperText;
        }

        if ($this->color !== null) {
            $props['color'] = $this->color;
        }

        if ($this->className !== null) {
            $props['className'] = $this->className;
        }

        if ($this->disabled !== null) {
            $props['disabled'] = $this->disabled;
        }

        if ($this->checked !== null) {
            $props['checked'] = $this->checked;
        }

        if ($this->name !== null) {
            $props['name'] = $this->name;
        }

        if ($this->value !== null) {
            $props['value'] = $this->value;
        }

        if ($this->required !== null) {
            $props['required'] = $this->required;
        }

        if ($this->ariaLabel !== null) {
            $props['ariaLabel'] = $this->ariaLabel;
        }

        if ($this->ariaDescribedBy !== null) {
            $props['ariaDescribedBy'] = $this->ariaDescribedBy;
        }

        return $props;
    }
}
