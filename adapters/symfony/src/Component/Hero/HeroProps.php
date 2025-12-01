<?php

namespace UiLibrary\SymfonyAdapter\Component\Hero;

readonly class HeroProps
{
    public function __construct(
        public ?string $backgroundImage = null,
        public ?string $align = null,
        public ?bool $overlay = null,
        public ?string $className = null,
    ) {
    }

    public function toArray(): array
    {
        $props = [];

        if ($this->backgroundImage !== null) {
            $props['backgroundImage'] = $this->backgroundImage;
        }

        if ($this->align !== null) {
            $props['align'] = $this->align;
        }

        if ($this->overlay !== null) {
            $props['overlay'] = $this->overlay;
        }

        if ($this->className !== null) {
            $props['className'] = $this->className;
        }

        return $props;
    }
}
