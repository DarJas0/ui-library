# Installation und Verwendung

## Frontend (npm Package)

### Installation

```bash
npm install ui-library
```

### Verwendung

#### 1. CSS importieren

Importiere die Tailwind CSS Styles in deiner Anwendung:

```javascript
// In deiner main.js/main.ts oder App.js/App.tsx
import 'ui-library/styles';
```

Oder in deinem CSS:

```css
@import 'ui-library/styles';
```

#### 2. Komponenten verwenden

**Option A: Direkte Verwendung in React**

```tsx
import { Button, Alert, Card } from 'ui-library';

function App() {
  return (
    <div>
      <Button label="Klicken Sie hier" color="red" variant="solid" />
      <Alert variant="info" title="Hinweis">Dies ist eine Info-Nachricht</Alert>
    </div>
  );
}
```

**Option B: Automatische Hydration (für Symfony Integration)**

Wenn du Symfony im Backend verwendest, generiert die Twig-Extension HTML mit `data-ui-component` Attributen. Um diese automatisch zu hydratisieren:

```javascript
import { hydrate } from 'ui-library/hydration';

// Automatisch nach DOM-Load
// Oder manuell:
hydrate();
```

Die Hydration-Funktion sucht automatisch nach allen Elementen mit `data-ui-component` Attributen und rendert die entsprechenden React-Komponenten.

#### 3. Manuelle Hydration

Falls du mehr Kontrolle benötigst:

```javascript
import { hydrate } from 'ui-library/hydration';

// Hydrate nur innerhalb eines bestimmten Elements
const container = document.getElementById('my-container');
const cleanup = hydrate(container);

// Später aufräumen
cleanup();
```

## Backend (Symfony)

### Installation

```bash
composer require ui-library/symfony-adapter
```

### Konfiguration

#### Automatische Bundle-Registrierung (Symfony Flex)

Wenn du Symfony Flex verwendest, wird das Bundle automatisch registriert.

#### Manuelle Bundle-Registrierung

Falls nicht, registriere das Bundle in `config/bundles.php`:

```php
<?php

return [
    // ...
    UiLibrary\SymfonyAdapter\Bundle\UiLibraryBundle::class => ['all' => true],
];
```

Die Twig-Extension wird automatisch registriert.

### Verwendung in Twig

```twig
{# Button #}
{{ ui_component('Button', {
    'label': 'Klicken Sie hier',
    'color': 'red',
    'variant': 'solid',
    'size': 'medium'
}) }}

{# Alert #}
{{ ui_component('Alert', {
    'title': 'Hinweis',
    'variant': 'info',
    'dismissible': true
}) }}
    Dies ist der Alert-Inhalt
{{ ui_component_end('Alert') }}

{# Mit Props-Objekt #}
{% set buttonProps = {
    'label': 'Mein Button',
    'color': 'purple',
    'variant': 'outline'
} %}
{{ ui_component('Button', buttonProps) }}
```

### Verwendung in PHP Controllers

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

### Verfügbare Komponenten

- `Button` - Button-Komponente
- `Alert` - Alert-Komponente
- `Badge` - Badge-Komponente
- `Card` - Card-Komponente (mit CardHeader, CardBody, CardFooter)
- `Input` - Input-Feld
- `Select` - Select-Dropdown
- `Switch` - Switch/Toggle
- `Checkbox` - Checkbox
- `Radio` - Radio-Button
- `Hero` - Hero-Sektion
- `Cta` - Call-to-Action-Sektion

## Vollständiges Beispiel

### 1. Backend (Symfony)

**Controller:**
```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig');
    }
}
```

**Twig Template (`templates/home/index.html.twig`):**
```twig
<!DOCTYPE html>
<html>
<head>
    <title>Meine App</title>
    <link rel="stylesheet" href="{{ asset('build/app.css') }}">
</head>
<body>
    <h1>Willkommen</h1>
    
    {{ ui_component('Button', {
        'label': 'Jetzt starten',
        'color': 'red',
        'variant': 'solid',
        'size': 'large'
    }) }}
    
    {{ ui_component('Alert', {
        'title': 'Wichtig',
        'variant': 'info',
        'dismissible': true
    }) }}
        Dies ist eine wichtige Nachricht.
    {{ ui_component_end('Alert') }}
    
    <script src="{{ asset('build/app.js') }}"></script>
</body>
</html>
```

### 2. Frontend (JavaScript/TypeScript)

**main.js:**
```javascript
import { hydrate } from 'ui-library/hydration';
import 'ui-library/styles';

// Automatische Hydration aller Komponenten
hydrate();
```

**Oder mit Webpack/Vite:**
```javascript
// vite.config.js / webpack.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // ... deine Config
});
```

**app.js (Entry Point):**
```javascript
import { hydrate } from 'ui-library/hydration';
import 'ui-library/styles';

// Hydrate nach DOM-Load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => hydrate());
} else {
  hydrate();
}
```

## TypeScript Support

Das Package enthält vollständige TypeScript-Definitionen:

```typescript
import { Button, type ButtonProps } from 'ui-library';

const props: ButtonProps = {
  label: 'Klicken',
  color: 'red',
  variant: 'solid',
  size: 'medium'
};

<Button {...props} />
```

## Troubleshooting

### Komponenten werden nicht gerendert

1. Stelle sicher, dass du die CSS importiert hast: `import 'ui-library/styles'`
2. Stelle sicher, dass du `hydrate()` aufrufst
3. Prüfe die Browser-Konsole auf Fehler
4. Stelle sicher, dass React und React-DOM installiert sind

### Symfony Twig-Funktion funktioniert nicht

1. Prüfe, ob das Bundle registriert ist
2. Prüfe, ob die Twig-Extension geladen ist: `php bin/console debug:container twig.extension`
3. Cache leeren: `php bin/console cache:clear`

### Styles fehlen

1. Stelle sicher, dass Tailwind CSS korrekt konfiguriert ist
2. Importiere `ui-library/styles` in deiner Anwendung
3. Prüfe, ob die CSS-Datei im Build enthalten ist

