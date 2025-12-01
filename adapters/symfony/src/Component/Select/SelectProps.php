<?php

namespace UiLibrary\SymfonyAdapter\Component\Select;

readonly class SelectProps
{
    public function __construct(
        public ?string $id = null,
        public ?string $label = null,
        public ?string $helperText = null,
        public ?string $size = null,
        public ?string $color = null,
        public ?string $className = null,
        public ?bool $disabled = null,
        public ?string $name = null,
        public ?string $value = null,
        public ?bool $required = null,
        public ?bool $multiple = null,
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

        if ($this->size !== null) {
            $props['size'] = $this->size;
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

        if ($this->name !== null) {
            $props['name'] = $this->name;
        }

        if ($this->value !== null) {
            $props['value'] = $this->value;
        }

        if ($this->required !== null) {
            $props['required'] = $this->required;
        }

        if ($this->multiple !== null) {
            $props['multiple'] = $this->multiple;
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
