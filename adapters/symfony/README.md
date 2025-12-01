# UI Library Symfony Adapter

Symfony-Adapter für die UI Library, der es ermöglicht, React-Komponenten in Twig-Templates zu verwenden.

## Installation

### Via Composer

```bash
composer require ui-library/symfony-adapter
```

### Manuelle Installation

1. Kopiere den `adapters/symfony` Ordner in dein Projekt
2. Füge die Autoload-Konfiguration zu deiner `composer.json` hinzu:

```json
{
  "autoload": {
    "psr-4": {
      "UiLibrary\\SymfonyAdapter\\": "adapters/symfony/src/"
    }
  }
}
```

3. Führe `composer dump-autoload` aus

## Konfiguration

### Automatische Konfiguration (Symfony Flex)

Wenn du Symfony Flex verwendest, wird das Bundle automatisch registriert und konfiguriert. Keine weitere Konfiguration nötig!

### Manuelle Konfiguration

Falls du Symfony Flex nicht verwendest oder manuelle Konfiguration bevorzugst:

**1. Bundle registrieren** in `config/bundles.php`:

```php
<?php

return [
    // ...
    UiLibrary\SymfonyAdapter\Bundle\UiLibraryBundle::class => ['all' => true],
];
```

Die Twig-Extension wird automatisch durch die Bundle-Konfiguration registriert.

## Verwendung

### In Twig-Templates

Verwende die `ui_component` Twig-Funktion:

```twig
{{ ui_component('Button', {
    'label': 'Klicken Sie hier',
    'color': 'red',
    'variant': 'solid',
    'size': 'medium'
}) }}
```

### Mit Props-Objekten

Du kannst auch Props-Objekte verwenden:

```twig
{% set buttonProps = {
    'label': 'Klicken Sie hier',
    'color': 'red',
    'variant': 'solid',
    'size': 'medium'
} %}

{{ ui_component('Button', buttonProps) }}
```

### Beispiel Controller

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use UiLibrary\SymfonyAdapter\Component\Button\ButtonProps;

class ExampleController extends AbstractController
{
    #[Route('/example', name: 'example')]
    public function example(): Response
    {
        $buttonProps = new ButtonProps(
            label: 'Klicken Sie hier',
            color: 'red',
            variant: 'solid',
            size: 'medium'
        );

        return $this->render('example/index.html.twig', [
            'buttonProps' => $buttonProps,
        ]);
    }
}
```

### Beispiel Twig-Aufruf

```twig
{# Verwendung mit Array #}
{{ ui_component('Button', {
    'label': 'Mein Button',
    'color': 'purple',
    'variant': 'outline'
}) }}

{# Verwendung mit Props-Objekt #}
{{ ui_component('Button', buttonProps) }}

{# Weitere Komponenten #}
{{ ui_component('Badge', {
    'color': 'red',
    'variant': 'solid',
    'size': 'md'
}) }}

{{ ui_component('Alert', {
    'title': 'Hinweis',
    'variant': 'info',
    'dismissible': true
}) }}

{{ ui_component('Card', {
    'variant': 'elevated',
    'accent': 'purple',
    'hoverable': true
}) }}

{{ ui_component('Checkbox', {
    'label': 'Ich stimme zu',
    'color': 'purple',
    'name': 'agreement'
}) }}

{{ ui_component('Radio', {
    'label': 'Option 1',
    'color': 'red',
    'name': 'choice',
    'value': 'option1'
}) }}

{{ ui_component('Cta', {
    'headline': 'Jetzt starten',
    'imageSrc': '/images/cta.jpg',
    'imageAlt': 'Call to Action',
    'primaryLabel': 'Loslegen'
}) }}

{{ ui_component('Hero', {
    'backgroundImage': '/images/hero.jpg',
    'align': 'center',
    'overlay': true
}) }}

{{ ui_component('Input', {
    'label': 'E-Mail',
    'placeholder': 'ihre@email.de',
    'type': 'email',
    'color': 'purple'
}) }}

{{ ui_component('Select', {
    'label': 'Auswahl',
    'name': 'choice',
    'color': 'red'
}) }}

{{ ui_component('Switch', {
    'label': 'Benachrichtigungen aktivieren',
    'color': 'purple',
    'checked': true
}) }}
```

## Verfügbare Komponenten

- `Alert` - Alert-Komponente mit verschiedenen Varianten
- `Badge` - Badge-Komponente für Labels und Tags
- `Button` - Button-Komponente mit verschiedenen Varianten und Größen
- `Card` - Card-Komponente für Inhaltscontainer
- `Checkbox` - Checkbox-Komponente
- `Radio` - Radio-Button-Komponente
- `Cta` - Call-to-Action-Sektion
- `Hero` - Hero-Sektion mit Hintergrundbild
- `Input` - Input-Feld-Komponente
- `Select` - Select-Dropdown-Komponente
- `Switch` - Switch/Toggle-Komponente

## Props-Klassen

Alle Props-Klassen befinden sich unter `UiLibrary\SymfonyAdapter\Component\<Komponente>\<Komponente>Props`.

Jede Props-Klasse:
- Hat readonly Properties entsprechend der TypeScript-Interface
- Bietet eine `toArray()` Methode zur Serialisierung
- Unterstützt optionale Properties

### Verfügbare Props-Klassen

- `UiLibrary\SymfonyAdapter\Component\Alert\AlertProps`
- `UiLibrary\SymfonyAdapter\Component\Badge\BadgeProps`
- `UiLibrary\SymfonyAdapter\Component\Button\ButtonProps`
- `UiLibrary\SymfonyAdapter\Component\Card\CardProps`
- `UiLibrary\SymfonyAdapter\Component\CheckboxRadio\CheckboxProps`
- `UiLibrary\SymfonyAdapter\Component\CheckboxRadio\RadioProps`
- `UiLibrary\SymfonyAdapter\Component\Cta\CtaProps`
- `UiLibrary\SymfonyAdapter\Component\Hero\HeroProps`
- `UiLibrary\SymfonyAdapter\Component\Input\InputProps`
- `UiLibrary\SymfonyAdapter\Component\Select\SelectProps`
- `UiLibrary\SymfonyAdapter\Component\Switch\SwitchProps`

## Frontend-Integration

Die Twig-Funktion erzeugt HTML mit `data-ui-component` und `data-ui-props` Attributen. 

Stelle sicher, dass deine React-Anwendung diese Attribute erkennt und die entsprechenden Komponenten rendert:

```javascript
// Beispiel: React Hydration
document.querySelectorAll('[data-ui-component]').forEach(element => {
  const componentName = element.getAttribute('data-ui-component');
  const props = JSON.parse(element.getAttribute('data-ui-props') || '{}');
  
  // Rendere die entsprechende React-Komponente
  // ...
});
```
