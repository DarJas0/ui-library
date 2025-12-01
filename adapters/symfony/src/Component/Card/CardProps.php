<?php

namespace UiLibrary\SymfonyAdapter\Component\Card;

readonly class CardProps
{
    public function __construct(
        public ?string $variant = null,
        public ?string $accent = null,
        public ?bool $hoverable = null,
        public ?string $padding = null,
        public ?string $className = null,
    ) {
    }

    public function toArray(): array
    {
        $props = [];

        if ($this->variant !== null) {
            $props['variant'] = $this->variant;
        }

        if ($this->accent !== null) {
            $props['accent'] = $this->accent;
        }

        if ($this->hoverable !== null) {
            $props['hoverable'] = $this->hoverable;
        }

        if ($this->padding !== null) {
            $props['padding'] = $this->padding;
        }

        if ($this->className !== null) {
            $props['className'] = $this->className;
        }

        return $props;
    }
}
