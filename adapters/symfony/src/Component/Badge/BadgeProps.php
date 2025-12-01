<?php

namespace UiLibrary\SymfonyAdapter\Component\Badge;

readonly class BadgeProps
{
    public function __construct(
        public ?string $color = null,
        public ?string $variant = null,
        public ?string $size = null,
        public ?string $className = null,
    ) {
    }

    public function toArray(): array
    {
        $props = [];

        if ($this->color !== null) {
            $props['color'] = $this->color;
        }

        if ($this->variant !== null) {
            $props['variant'] = $this->variant;
        }

        if ($this->size !== null) {
            $props['size'] = $this->size;
        }

        if ($this->className !== null) {
            $props['className'] = $this->className;
        }

        return $props;
    }
}
