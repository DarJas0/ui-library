<?php

/**
 * ButtonProps - PHP Props-Klasse für die Button-Komponente
 *
 * Diese Klasse ist eine 1:1-Spiegelung des TypeScript-Interfaces ButtonProps
 * aus lib/components/Button/Button.tsx und ermöglicht Type-Safe Props-Handling
 * in Symfony-Controllern und Twig-Templates.
 *
 * Architektur-Konzept: Props-Mirroring
 * =====================================
 * Die PHP-Props-Klassen dienen als Type-Safety-Layer zwischen Symfony (PHP)
 * und React (TypeScript). Sie stellen sicher, dass Props auf dem Backend
 * korrekt typisiert sind und bei der Serialisierung (toArray()) konsistent
 * an das Frontend übergeben werden.
 *
 * Verwendung in Symfony-Controllern:
 * -----------------------------------
 * ```php
 * $button = new ButtonProps(
 *     label: 'Jetzt starten',
 *     color: 'red',
 *     variant: 'solid',
 *     size: 'large'
 * );
 * return $this->render('template.html.twig', ['button' => $button]);
 * ```
 *
 * Verwendung in Twig-Templates:
 * ------------------------------
 * ```twig
 * {{ ui_component('Button', button) }}
 * ```
 *
 * @package   UiLibrary\SymfonyAdapter\Component\Button
 * @author    UI Library Team
 * @version   1.0.0
 * @see       lib/components/Button/Button.tsx TypeScript-Interface
 * @psalm-immutable
 */

namespace UiLibrary\SymfonyAdapter\Component\Button;

/**
 * Readonly Props-Klasse für Button-Komponente
 *
 * Diese Klasse nutzt PHP 8.1 Readonly Properties für Immutability.
 * Nach der Konstruktion können Properties nicht mehr verändert werden,
 * was konsistentes Verhalten und bessere Testbarkeit garantiert.
 *
 * @readonly
 */
readonly class ButtonProps
{
    /**
     * Konstruktor für ButtonProps
     *
     * Named Arguments (PHP 8.0+) ermöglichen flexible und lesbare Props-Definition.
     * Required Props müssen ohne Default-Wert übergeben werden, Optional Props
     * haben null als Default und werden nur bei expliziter Angabe serialisiert.
     *
     * @param string      $label    Button-Text (Required)
     * @param string|null $color    Farbschema: 'red' | 'purple' (Default: null → Frontend nutzt 'red')
     * @param string|null $variant  Darstellungsvariante: 'solid' | 'outline' (Default: null → Frontend nutzt 'solid')
     * @param string|null $size     Größe: 'small' | 'medium' | 'large' (Default: null → Frontend nutzt 'medium')
     * @param bool|null   $disabled Deaktiviert Interaktion (Default: null → Frontend nutzt false)
     */
    public function __construct(
        public string $label,
        public ?string $color = null,
        public ?string $variant = null,
        public ?string $size = null,
        public ?bool $disabled = null,
    ) {
    }

    /**
     * Serialisiert Props zu Array für JSON-Encoding
     *
     * Diese Methode wird von der Twig-Extension aufgerufen, um Props
     * in JSON zu konvertieren. Nur non-null Werte werden inkludiert,
     * um das JSON-Payload minimal zu halten und Frontend-Defaults zu nutzen.
     *
     * Implementierung: Conditional Property Inclusion
     * ------------------------------------------------
     * Null-Werte werden bewusst weggelassen, damit React-Komponenten ihre
     * Default-Props nutzen können. Dies reduziert Redundanz und macht
     * das data-ui-props Attribut schlanker.
     *
     * @return array<string, mixed> Assoziatives Array für JSON-Serialisierung
     *
     * @example
     * ```php
     * $props = new ButtonProps(label: 'Test', color: 'red');
     * $array = $props->toArray();
     * // Result: ['label' => 'Test', 'color' => 'red']
     * // 'variant', 'size', 'disabled' werden weggelassen (null)
     * ```
     */
    public function toArray(): array
    {
        // Start with required props
        $props = [
            'label' => $this->label,
        ];

        // Conditionally add optional props (nur wenn nicht null)
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
