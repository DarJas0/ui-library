<?php

namespace UiLibrary\SymfonyAdapter\Component\Cta;

readonly class CtaProps
{
    public function __construct(
        public string $headline,
        public string $imageSrc,
        public string $primaryLabel,
        public ?string $imageAlt = null,
        public ?string $className = null,
    ) {
    }

    public function toArray(): array
    {
        $props = [
            'headline' => $this->headline,
            'imageSrc' => $this->imageSrc,
            'primaryLabel' => $this->primaryLabel,
        ];

        if ($this->imageAlt !== null) {
            $props['imageAlt'] = $this->imageAlt;
        }

        if ($this->className !== null) {
            $props['className'] = $this->className;
        }

        return $props;
    }
}
