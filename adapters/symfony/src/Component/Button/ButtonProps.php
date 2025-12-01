<?php

namespace UiLibrary\SymfonyAdapter\Component\Button;

readonly class ButtonProps
{
    public function __construct(
        public string $label,
        public ?string $color = null,
        public ?string $variant = null,
        public ?string $size = null,
        public ?bool $disabled = null,
    ) {
    }

    public function toArray(): array
    {
        $props = [
            'label' => $this->label,
        ];

        if ($this->color !== null) {
            $props['color'] = $this->color;
        }

        if ($this->variant !== null) {
            $props['variant'] = $this->variant;
        }

        if ($this->size !== null) {
            $props['size'] = $this->size;
        }

        if ($this->disabled !== null) {
            $props['disabled'] = $this->disabled;
        }

        return $props;
    }
}
