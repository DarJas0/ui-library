## UI Library

Eine moderne React-Komponentenbibliothek mit Symfony-Integration. Perfekt für Projekte, die React im Frontend und Symfony im Backend verwenden.

### Features

- 🎨 **Moderne UI-Komponenten**: Button, Alert, Badge, Card, Input, Select, Switch, Checkbox, Radio, Hero, CTA
- ⚡ **React + TypeScript**: Vollständig typisiert mit TypeScript
- 🎨 **Tailwind CSS v4**: Moderne Utility-First Styling
- 🔌 **Symfony Integration**: Nahtlose Integration mit Symfony und Twig
- 🚀 **Zero-Config Hydration**: Automatische Hydration von Server-seitig generierten Komponenten
- 📦 **npm Package**: Einfache Installation und Verwendung

### Installation

#### Frontend (npm)

```bash
npm install ui-library
```

#### Backend (Symfony/Composer)

```bash
composer require ui-library/symfony-adapter
```

### Quick Start

#### Frontend

```javascript
// 1. CSS importieren
import 'ui-library/styles';

// 2. Hydration aktivieren (für Symfony-Integration)
import { hydrate } from 'ui-library/hydration';
hydrate();

// Oder Komponenten direkt verwenden
import { Button, Alert } from 'ui-library';

function App() {
  return (
    <div>
      <Button label="Klicken" color="red" variant="solid" />
      <Alert variant="info" title="Hinweis">Nachricht</Alert>
    </div>
  );
}
```

#### Backend (Symfony/Twig)

```twig
{# In deinem Twig-Template #}
{{ ui_component('Button', {
    'label': 'Klicken Sie hier',
    'color': 'red',
    'variant': 'solid',
    'size': 'medium'
}) }}

{{ ui_component('Alert', {
    'title': 'Wichtig',
    'variant': 'info',
    'dismissible': true
}) }}
    Dies ist eine wichtige Nachricht.
{{ ui_component_end('Alert') }}
```

### Verfügbare Komponenten

- **Button**: `color` (red | purple), `variant` (solid | outline), `size` (small | medium | large)
- **Alert**: `variant` (info | success | warning | error), `dismissible`, `title`
- **Badge**: `color`, `variant` (soft | solid | outline), `size` (sm | md)
- **Card**: `variant` (elevated | outline | soft), `accent` (none | purple | red)
- **Input**: `size`, `variant`, `color`, `label`, `helperText`
- **Select**: `size`, `color`, `label`, `helperText`
- **Switch**: `color`, `checked`, `label`
- **Checkbox**: `color`, `label`, `helperText`
- **Radio**: `color`, `label`, `helperText`
- **Hero**: `backgroundImage`, `align` (left | center), `overlay`
- **Cta**: `headline`, `imageSrc`, `primaryLabel`, `body`

### Dokumentation

- [Installation und Verwendung](INSTALLATION.md) - Detaillierte Installationsanleitung
- [Struktur-Analyse](STRUCTURE_ANALYSIS.md) - Projektstruktur und Best Practices

### Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Vite** (Build Tool)
- **Storybook** (Komponenten-Dokumentation)
- **Symfony 6/7** (Backend-Integration)

### Entwicklung

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Storybook starten
npm run storybook

# Library bauen
npm run build

# Tests
npm test
```

### Lizenz

MIT

### Beitragen

Beiträge sind willkommen! Bitte öffne ein Issue oder einen Pull Request.
