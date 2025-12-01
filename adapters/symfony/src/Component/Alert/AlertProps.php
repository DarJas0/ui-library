<?php

namespace UiLibrary\SymfonyAdapter\Component\Alert;

readonly class AlertProps
{
    public function __construct(
        public ?string $title = null,
        public ?string $variant = null,
        public ?bool $dismissible = null,
        public ?string $className = null,
    ) {
    }

    public function toArray(): array
    {
        $props = [];

        if ($this->title !== null) {
            $props['title'] = $this->title;
        }

        if ($this->variant !== null) {
            $props['variant'] = $this->variant;
        }

        if ($this->dismissible !== null) {
            $props['dismissible'] = $this->dismissible;
        }

        if ($this->className !== null) {
            $props['className'] = $this->className;
        }

        return $props;
    }
}
