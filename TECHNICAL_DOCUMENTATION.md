# UI Library - Complete Technical Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Project Structure](#project-structure)
4. [Frontend Layer (React/TypeScript)](#frontend-layer)
5. [Backend Layer (Symfony/PHP)](#backend-layer)
6. [How It Works - Complete Flow](#how-it-works)
7. [Build System](#build-system)
8. [Component System](#component-system)
9. [Development Workflow](#development-workflow)
10. [Installation & Usage](#installation--usage)

---

## Overview

**UI Library** is a hybrid component library that bridges React and Symfony. It allows developers to:
- Build React components with TypeScript and Tailwind CSS
- Use those same components in Symfony/Twig templates via server-side rendering
- Automatically hydrate server-rendered components with React on the client-side
- Maintain type safety across the full stack (TypeScript → PHP Props classes)

### Key Technologies
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Vite
- **Backend**: PHP 8.1+, Symfony 6/7, Twig
- **Development**: Storybook, Vitest, Playwright
- **Build**: Vite (library mode), npm packaging

---

## Architecture

The library uses a **three-layer architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                    1. REACT COMPONENTS                      │
│              (lib/components/*.tsx)                         │
│     Written in TypeScript, styled with Tailwind CSS        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 2. NPM PACKAGE BUILD                        │
│           (dist/ui-library.mjs + style.css)                 │
│         Vite builds and bundles for distribution            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 3. SYMFONY ADAPTER                          │
│            (adapters/symfony/*.php)                         │
│  Twig Extension generates HTML with data-ui-component attrs │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 4. CLIENT HYDRATION                         │
│              (lib/hydration.ts)                             │
│   React finds data-ui-component elements and hydrates them  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

**Server-Side (Symfony → HTML)**
```php
// Controller creates Props object
$buttonProps = new ButtonProps(label: 'Click Me', color: 'red');

// Twig renders HTML with data attributes
{{ ui_component('Button', buttonProps) }}

// Output:
<div data-ui-component="Button" 
     data-ui-props='{"label":"Click Me","color":"red"}'>
</div>
```

**Client-Side (React Hydration)**
```javascript
// hydration.ts finds all [data-ui-component] elements
hydrate();

// For each element:
// 1. Read component name from data-ui-component
// 2. Parse props from data-ui-props JSON
// 3. Look up component in registry
// 4. Render React component in that DOM element
```

---

## Project Structure

```
ui-library/
├── lib/                          # 📦 LIBRARY SOURCE (what gets published to npm)
│   ├── components/               # React component implementations
│   │   ├── Alert/
│   │   │   └── Alert.tsx        # Alert component with TypeScript interface
│   │   ├── Badge/
│   │   │   └── Badge.tsx
│   │   ├── Button/
│   │   │   └── Button.tsx       # Button with color/variant/size props
│   │   ├── Card/
│   │   │   └── Card.tsx         # Card with Header/Body/Footer subcomponents
│   │   ├── CheckboxRadio/
│   │   │   └── CheckboxRadio.tsx # Checkbox and Radio components
│   │   ├── Cta/
│   │   │   └── Cta.tsx          # Call-to-Action section component
│   │   ├── Hero/
│   │   │   └── Hero.tsx         # Hero section with subcomponents
│   │   ├── Input/
│   │   │   └── Input.tsx        # Text input with label/helper text
│   │   ├── Select/
│   │   │   └── Select.tsx       # Select dropdown
│   │   └── Switch/
│   │       └── Switch.tsx       # Toggle switch component
│   ├── styles/
│   │   └── tailwind.css         # Tailwind CSS entry point
│   ├── index.ts                 # Main export file - exports all components
│   └── hydration.ts             # Client-side hydration logic
│
├── adapters/                     # 🔌 FRAMEWORK ADAPTERS
│   └── symfony/                 # Symfony/Twig integration
│       ├── src/
│       │   ├── Bundle/
│       │   │   └── UiLibraryBundle.php       # Symfony Bundle definition
│       │   ├── Component/                    # PHP Props classes (mirrors TS interfaces)
│       │   │   ├── Alert/
│       │   │   │   └── AlertProps.php
│       │   │   ├── Badge/
│       │   │   │   └── BadgeProps.php
│       │   │   ├── Button/
│       │   │   │   └── ButtonProps.php       # readonly class with toArray()
│       │   │   ├── Card/
│       │   │   │   └── CardProps.php
│       │   │   ├── CheckboxRadio/
│       │   │   │   ├── CheckboxProps.php
│       │   │   │   └── RadioProps.php
│       │   │   ├── Cta/
│       │   │   │   └── CtaProps.php
│       │   │   ├── Hero/
│       │   │   │   └── HeroProps.php
│       │   │   ├── Input/
│       │   │   │   └── InputProps.php
│       │   │   ├── Select/
│       │   │   │   └── SelectProps.php
│       │   │   └── Switch/
│       │   │       └── SwitchProps.php
│       │   ├── DependencyInjection/
│       │   │   └── UiLibraryExtension.php    # Loads services.yaml
│       │   └── Twig/
│       │       └── UiComponentExtension.php  # ui_component() Twig function
│       ├── config/
│       │   └── services.yaml                # Registers Twig extension
│       ├── composer.json                    # Symfony adapter package definition
│       └── README.md                        # Symfony adapter documentation
│
├── src/                          # 🧪 DEVELOPMENT/DEMO APP
│   ├── stories/                 # Storybook stories for documentation
│   │   └── components/
│   │       └── UI/              # Stories for each component
│   │           ├── Button.stories.ts
│   │           ├── Alert.stories.tsx
│   │           └── ...
│   ├── App.tsx                  # Demo React application
│   └── main.tsx                 # Entry point for development
│
├── dist/                         # 📦 BUILD OUTPUT (generated by `npm run build`)
│   ├── ui-library.mjs           # ESM bundle
│   ├── ui-library.cjs           # CommonJS bundle
│   ├── hydration.mjs            # Separate hydration entry point (ESM)
│   ├── hydration.cjs            # Separate hydration entry point (CJS)
│   ├── index.d.ts               # TypeScript definitions for main export
│   ├── hydration.d.ts           # TypeScript definitions for hydration
│   └── style.css                # Compiled Tailwind CSS
│
├── vite.config.ts               # Build configuration (library + app modes)
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.lib.json            # TypeScript for library build
├── package.json                 # npm package definition
└── README.md                    # User-facing documentation
```

### Key Directories Explained

#### `/lib` - Library Source Code
- **Purpose**: Contains the actual React components that get published to npm
- **Components**: Each component is self-contained with its TypeScript interface
- **Exports**: `lib/index.ts` exports all components and types
- **Hydration**: `lib/hydration.ts` provides automatic client-side rendering

#### `/adapters/symfony` - Backend Integration
- **Purpose**: Allows Symfony/Twig templates to use React components
- **Bundle**: Standard Symfony bundle with auto-registration
- **Props Classes**: PHP mirror of TypeScript interfaces for type safety
- **Twig Extension**: Provides `ui_component()` function in templates

#### `/src` - Development Environment
- **Purpose**: Demo app and component documentation
- **Storybook**: Interactive component browser and documentation
- **Not Published**: This directory is excluded from npm package

#### `/dist` - Built Package
- **Generated**: Created by `npm run build`
- **Published**: This is what gets published to npm
- **Formats**: ESM and CJS for maximum compatibility

---

## Frontend Layer

### React Components Structure

Each component follows this pattern:

```typescript
// lib/components/Button/Button.tsx

// 1. TypeScript Interface (Props definition)
export interface ButtonProps {
  color?: "red" | "purple";
  variant?: "solid" | "outline";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

// 2. React Component (Implementation)
export const Button = ({
  color = "red",
  variant = "solid",
  size = "medium",
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  // Tailwind CSS classes for styling
  const base = "inline-block font-bold rounded-full ...";
  const sizes = { small: "px-4 py-2", ... };
  const variants = { solid: { red: "bg-red-500", ... }, ... };
  
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant][color]}`}>
      {label}
    </button>
  );
};
```

### Component Registry

The hydration system uses a component registry to map component names (strings) to React components:

```typescript
// lib/hydration.ts

const componentRegistry: Record<string, React.ComponentType<any>> = {
  Button,      // Maps "Button" string → Button component
  Alert,       // Maps "Alert" string → Alert component
  Badge,       // etc.
  Card,
  Input,
  Select,
  Switch,
  Checkbox,
  Radio,
  Hero,
  Cta: CtaSection,  // Aliases supported
};
```

**How it works:**
1. When Twig renders `{{ ui_component('Button', ...) }}`, it sets `data-ui-component="Button"`
2. The hydration function looks up `componentRegistry['Button']`
3. It finds the `Button` React component and renders it

### Hydration System

The hydration system is the bridge between server-rendered HTML and interactive React components:

```typescript
// lib/hydration.ts

export function hydrate(rootElement: HTMLElement = document.body): () => void {
  // 1. Find all elements with data-ui-component
  const elements = rootElement.querySelectorAll('[data-ui-component]');
  const roots: Root[] = [];

  elements.forEach((element) => {
    // 2. Extract component name and props
    const componentName = element.getAttribute('data-ui-component');
    const propsJson = element.getAttribute('data-ui-props');
    
    // 3. Look up component in registry
    const Component = componentRegistry[componentName];
    
    if (!Component) {
      console.warn(`Component "${componentName}" not found in registry`);
      return;
    }
    
    // 4. Parse props JSON
    let props = {};
    if (propsJson) {
      try {
        props = JSON.parse(propsJson);
      } catch (e) {
        console.error(`Failed to parse props for ${componentName}:`, e);
        return;
      }
    }
    
    // 5. Create React root and render
    const root = createRoot(element);
    root.render(<Component {...props} />);
    roots.push(root);
  });

  // 6. Return cleanup function
  return () => roots.forEach(root => root.unmount());
}

// Auto-hydrate when DOM is ready
if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => hydrate());
} else if (typeof window !== 'undefined') {
  hydrate();
}
```

**Key Features:**
- **Automatic**: Runs on DOMContentLoaded if imported
- **Scoped**: Can target specific DOM subtrees
- **Clean**: Returns cleanup function for unmounting
- **Error Handling**: Logs warnings for missing components or invalid props

### Styling with Tailwind

```typescript
// tailwind.config.ts - Brand colors
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#FF5050",
          redLight: "#FF6A6A",
          purple: "#6B2EFF",
          purpleLight: "#8C5CFF",
          orange: "#FF7A00",
          orangeLight: "#FF9A3D",
        }
      }
    }
  }
}

// lib/styles/tailwind.css
@import "tailwindcss";
```

**Styling Approach:**
- Utility-first with Tailwind CSS
- Component-specific classes defined inline
- Brand colors configured in `tailwind.config.ts`
- CSS compiled and included in `dist/style.css`

---

## Backend Layer

### Symfony Bundle Architecture

```php
// adapters/symfony/src/Bundle/UiLibraryBundle.php

namespace UiLibrary\SymfonyAdapter\Bundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class UiLibraryBundle extends Bundle
{
    // Auto-discovers Extension and loads configuration
    // Symfony automatically looks for:
    // - DependencyInjection/UiLibraryExtension.php
    // - config/services.yaml
}
```

**How Symfony Bundles Work:**
1. Bundle is registered in `config/bundles.php`
2. Symfony finds `UiLibraryExtension` by convention
3. Extension loads `config/services.yaml`
4. Services (like Twig extension) are registered in the container

### Dependency Injection

```php
// adapters/symfony/src/DependencyInjection/UiLibraryExtension.php

namespace UiLibrary\SymfonyAdapter\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class UiLibraryExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container): void
    {
        // Load services from config/services.yaml
        $loader = new YamlFileLoader(
            $container, 
            new FileLocator(__DIR__ . '/../../config')
        );
        $loader->load('services.yaml');
    }
}
```

```yaml
# adapters/symfony/config/services.yaml

services:
    UiLibrary\SymfonyAdapter\Twig\UiComponentExtension:
        tags:
            - { name: twig.extension }  # Registers as Twig extension
```

**What This Does:**
- Registers `UiComponentExtension` as a Twig extension
- Makes `ui_component()` function available in all Twig templates
- Auto-wired by Symfony's dependency injection container

### Twig Extension

The Twig extension provides the `ui_component()` function:

```php
// adapters/symfony/src/Twig/UiComponentExtension.php

namespace UiLibrary\SymfonyAdapter\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class UiComponentExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('ui_component', [$this, 'renderUiComponent'], [
                'is_safe' => ['html']  // Marks output as safe HTML (won't be escaped)
            ]),
        ];
    }

    public function renderUiComponent(string $name, array|object $props = []): string
    {
        // 1. Normalize props (handle Props objects or arrays)
        $propsArray = $this->normalizeProps($props);
        
        // 2. Encode props as JSON
        $propsJson = json_encode(
            $propsArray, 
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        
        // 3. Return HTML with data attributes
        return sprintf(
            '<div data-ui-component="%s" data-ui-props="%s"></div>',
            htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
            htmlspecialchars($propsJson, ENT_QUOTES, 'UTF-8')
        );
    }

    private function normalizeProps(array|object $props): array
    {
        // Handle Props objects with toArray() method
        if (is_object($props) && method_exists($props, 'toArray')) {
            return $props->toArray();
        }
        
        // Handle stdClass
        if ($props instanceof \stdClass) {
            return (array) $props;
        }
        
        // Already an array
        return $props;
    }
}
```

**Function Behavior:**
- **Input**: Component name (string) + props (array or Props object)
- **Process**: Converts props to array, JSON encodes, escapes for HTML
- **Output**: `<div>` with `data-ui-component` and `data-ui-props` attributes

### Props Classes (Type Safety)

Props classes mirror TypeScript interfaces to provide type safety in PHP:

```php
// adapters/symfony/src/Component/Button/ButtonProps.php

namespace UiLibrary\SymfonyAdapter\Component\Button;

readonly class ButtonProps  // PHP 8.1+ readonly class
{
    public function __construct(
        public string $label,              // Required prop
        public ?string $color = null,      // Optional props with defaults
        public ?string $variant = null,
        public ?string $size = null,
        public ?bool $disabled = null,
    ) {}

    public function toArray(): array
    {
        $props = ['label' => $this->label];
        
        // Only include non-null optional props
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
```

**TypeScript Interface (for comparison):**
```typescript
// lib/components/Button/Button.tsx

export interface ButtonProps {
  label: string;
  color?: "red" | "purple";
  variant?: "solid" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}
```

**Benefits:**
- ✅ Type safety in PHP controllers
- ✅ IDE autocomplete for props
- ✅ Consistent API between PHP and TypeScript
- ✅ `toArray()` handles serialization for JSON encoding

---

## How It Works

### Complete Request Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. DEVELOPER WRITES TWIG TEMPLATE                          │
└─────────────────────────────────────────────────────────────┘
{{ ui_component('Button', {'label': 'Click Me', 'color': 'red'}) }}
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. TWIG EXTENSION PROCESSES                                 │
└─────────────────────────────────────────────────────────────┘
UiComponentExtension::renderUiComponent('Button', [...])
- Converts props to array
- JSON encodes props
- Generates HTML with data-attributes
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. SERVER SENDS HTML                                        │
└─────────────────────────────────────────────────────────────┘
<div data-ui-component="Button" 
     data-ui-props='{"label":"Click Me","color":"red"}'>
</div>
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. BROWSER LOADS PAGE + JAVASCRIPT                          │
└─────────────────────────────────────────────────────────────┘
<script src="app.js"></script>
// app.js contains:
import { hydrate } from 'ui-library/hydration';
import 'ui-library/styles';
hydrate();
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. HYDRATION RUNS                                           │
└─────────────────────────────────────────────────────────────┘
- Finds: document.querySelectorAll('[data-ui-component]')
- Reads: data-ui-component="Button"
- Parses: data-ui-props JSON
- Looks up: componentRegistry['Button'] → Button component
- Renders: <Button label="Click Me" color="red" />
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. INTERACTIVE REACT COMPONENT                              │
└─────────────────────────────────────────────────────────────┘
User sees and interacts with fully functional React button
```

### Example: Button Component Flow

**Step 1: Symfony Controller**
```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use UiLibrary\SymfonyAdapter\Component\Button\ButtonProps;

class DemoController extends AbstractController
{
    #[Route('/demo', name: 'demo')]
    public function demo(): Response
    {
        // Create type-safe ButtonProps object
        $button = new ButtonProps(
            label: 'Get Started',
            color: 'red',
            variant: 'solid',
            size: 'large'
        );
        
        return $this->render('demo/index.html.twig', [
            'button' => $button,
        ]);
    }
}
```

**Step 2: Twig Template**
```twig
{# templates/demo/index.html.twig #}
<!DOCTYPE html>
<html>
<head>
    <title>Demo</title>
    <link rel="stylesheet" href="{{ asset('build/app.css') }}">
</head>
<body>
    <div class="hero">
        <h1>Welcome</h1>
        <p>Get started with our platform</p>
        
        {# Use the button #}
        {{ ui_component('Button', button) }}
    </div>
    
    <script src="{{ asset('build/app.js') }}"></script>
</body>
</html>
```

**Step 3: Rendered HTML (before hydration)**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Demo</title>
    <link rel="stylesheet" href="/build/app.css">
</head>
<body>
    <div class="hero">
        <h1>Welcome</h1>
        <p>Get started with our platform</p>
        
        <!-- Twig extension output -->
        <div data-ui-component="Button" 
             data-ui-props='{"label":"Get Started","color":"red","variant":"solid","size":"large"}'>
        </div>
    </div>
    
    <script src="/build/app.js"></script>
</body>
</html>
```

**Step 4: Frontend JavaScript**
```javascript
// assets/app.js

import { hydrate } from 'ui-library/hydration';
import 'ui-library/styles';

// Hydration happens automatically when this module loads
// or you can call it explicitly:
hydrate();
```

**Step 5: After Hydration (React rendered)**
```html
<div class="hero">
    <h1>Welcome</h1>
    <p>Get started with our platform</p>
    
    <div data-ui-component="Button" data-ui-props='...'>
        <!-- React rendered content inside -->
        <button type="button" 
                class="inline-block font-bold font-sans leading-none rounded-full 
                       cursor-pointer transition-all duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 px-6 py-3 text-base 
                       text-white bg-gradient-to-r from-[#FF5050] to-[#FF6A6A] 
                       hover:opacity-90 focus:ring-[#FF5050]/60">
            Get Started
        </button>
    </div>
</div>
```

### Progressive Enhancement

The system supports progressive enhancement:

1. **Without JavaScript**: The empty `<div>` is present but not visible
2. **With JavaScript**: React hydrates and renders the interactive component
3. **JavaScript Error**: Component fails gracefully (logged to console)

---

## Build System

### Vite Configuration

The project uses Vite with two configurations:

```typescript
// vite.config.ts

// Library build configuration (for npm publishing)
const libraryConfig = defineConfig({
  plugins: [react(), tailwind()],
  build: {
    lib: {
      entry: {
        index: resolve('lib/index.ts'),       // Main entry point
        hydration: resolve('lib/hydration.ts'), // Separate hydration entry
      },
      name: 'UiLibrary',
      formats: ['es', 'cjs'],  // Build both ESM and CommonJS
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';
        return entryName === 'index' 
          ? `ui-library.${ext}`     // index → ui-library.mjs/cjs
          : `${entryName}.${ext}`;  // hydration → hydration.mjs/cjs
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],  // Peer dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        assetFileNames: 'style.css',  // Output CSS as style.css
      },
    },
    cssCodeSplit: false,  // Single CSS file
    sourcemap: true,      // Generate source maps
  },
});

// App/Storybook development configuration
const appConfig = defineConfig({
  plugins: [react(), tailwind()],
  // Configuration for development server and Storybook
});

// Export based on environment
export default process.env.BUILD_LIB === 'true' ? libraryConfig : appConfig;
```

**Key Configuration Points:**
- **Multiple Entries**: Separate bundles for main library and hydration
- **Dual Format**: ESM (`.mjs`) and CommonJS (`.cjs`)
- **External Dependencies**: React and ReactDOM are peer dependencies
- **CSS Output**: Single `style.css` file with all Tailwind styles

### NPM Package Structure

```json
// package.json

{
  "name": "ui-library",
  "version": "1.0.0",
  "type": "module",
  
  // Main entry points
  "main": "./dist/ui-library.cjs",      // Default CJS entry
  "module": "./dist/ui-library.mjs",    // ESM entry
  "types": "./dist/index.d.ts",         // TypeScript definitions
  
  // Modern exports map
  "exports": {
    ".": {                               // import 'ui-library'
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/ui-library.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/ui-library.cjs"
      }
    },
    "./hydration": {                     // import 'ui-library/hydration'
      "import": {
        "types": "./dist/hydration.d.ts",
        "default": "./dist/hydration.mjs"
      },
      "require": {
        "types": "./dist/hydration.d.ts",
        "default": "./dist/hydration.cjs"
      }
    },
    "./styles": "./dist/style.css"      // import 'ui-library/styles'
  },
  
  // What gets published to npm
  "files": ["dist", "lib", "adapters"],
  
  // Build scripts
  "scripts": {
    "build": "tsc -p tsconfig.lib.json && BUILD_LIB=true vite build",
    "dev": "vite",
    "storybook": "storybook dev -p 6006"
  }
}
```

**Package Features:**
- ✅ Tree-shakeable ESM exports
- ✅ CommonJS compatibility
- ✅ TypeScript type definitions
- ✅ Separate hydration entry point
- ✅ CSS export for styling

### Build Process

```bash
# Full build command
npm run build
```

**Build Steps:**

1. **TypeScript Compilation**
   ```bash
   tsc -p tsconfig.lib.json
   ```
   - Compiles TypeScript to JavaScript
   - Generates `.d.ts` type definition files
   - Output: `dist/*.d.ts`

2. **Vite Library Build**
   ```bash
   BUILD_LIB=true vite build
   ```
   - Bundles `lib/index.ts` → `dist/ui-library.mjs` + `.cjs`
   - Bundles `lib/hydration.ts` → `dist/hydration.mjs` + `.cjs`
   - Processes Tailwind CSS → `dist/style.css`
   - Tree-shaking and minification
   - Generates source maps

3. **Result in `dist/`**
   ```
   dist/
   ├── ui-library.mjs       # ESM bundle (main library)
   ├── ui-library.mjs.map   # Source map for ESM
   ├── ui-library.cjs       # CommonJS bundle (main library)
   ├── ui-library.cjs.map   # Source map for CJS
   ├── hydration.mjs        # ESM bundle (hydration)
   ├── hydration.mjs.map    # Source map
   ├── hydration.cjs        # CommonJS bundle (hydration)
   ├── hydration.cjs.map    # Source map
   ├── index.d.ts           # TypeScript definitions (main)
   ├── hydration.d.ts       # TypeScript definitions (hydration)
   └── style.css            # Compiled Tailwind CSS
   ```

### Tailwind CSS Processing

```typescript
// tailwind.config.ts

export default {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./.storybook/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#FF5050",
          redLight: "#FF6A6A",
          purple: "#6B2EFF",
          purpleLight: "#8C5CFF",
          orange: "#FF7A00",
        }
      }
    }
  }
}
```

**Processing Steps:**
1. Vite's `@tailwindcss/vite` plugin processes CSS
2. Scans all component files for class names
3. Generates optimized CSS with only used utilities
4. Outputs to `dist/style.css`

---

## Component System

### Available Components

The library includes 11 component types:

#### 1. Button
**File**: `lib/components/Button/Button.tsx`

**Props**:
- `label: string` - Button text (required)
- `color?: "red" | "purple"` - Color theme
- `variant?: "solid" | "outline"` - Style variant
- `size?: "small" | "medium" | "large"` - Size
- `onClick?: () => void` - Click handler
- `disabled?: boolean` - Disabled state

**Usage**:
```tsx
<Button 
  label="Get Started" 
  color="red" 
  variant="solid" 
  size="large" 
/>
```

#### 2. Alert
**File**: `lib/components/Alert/Alert.tsx`

**Props**:
- `children: React.ReactNode` - Alert content (required)
- `variant?: "info" | "success" | "warning" | "error"` - Alert type
- `title?: string` - Alert title
- `dismissible?: boolean` - Show dismiss button
- `onClose?: () => void` - Dismiss callback
- `className?: string` - Additional classes

**Usage**:
```tsx
<Alert 
  variant="info" 
  title="Important" 
  dismissible 
  onClose={() => console.log('dismissed')}
>
  This is an important message.
</Alert>
```

#### 3. Badge
**File**: `lib/components/Badge/Badge.tsx`

**Props**:
- `children: React.ReactNode` - Badge content
- `color?: string` - Color theme
- `variant?: "soft" | "solid" | "outline"` - Style variant
- `size?: "sm" | "md"` - Size

**Usage**:
```tsx
<Badge color="red" variant="solid" size="md">
  New
</Badge>
```

#### 4. Card
**File**: `lib/components/Card/Card.tsx`

**Props**:
- `children: React.ReactNode` - Card content
- `variant?: "elevated" | "outline" | "soft"` - Style variant
- `accent?: "none" | "purple" | "red"` - Accent color
- `hoverable?: boolean` - Enable hover effect
- `className?: string` - Additional classes

**Subcomponents**: `CardHeader`, `CardBody`, `CardFooter`

**Usage**:
```tsx
<Card variant="elevated" accent="purple" hoverable>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button label="Action" />
  </CardFooter>
</Card>
```

#### 5. Input
**File**: `lib/components/Input/Input.tsx`

**Props**:
- `label?: string` - Input label
- `type?: string` - Input type (text, email, password, etc.)
- `placeholder?: string` - Placeholder text
- `helperText?: string` - Helper text below input
- `color?: string` - Color theme
- `size?: string` - Size variant
- `name?: string` - Form field name
- `value?: string` - Controlled value
- `onChange?: (e) => void` - Change handler

**Usage**:
```tsx
<Input 
  label="Email Address" 
  type="email" 
  placeholder="you@example.com"
  helperText="We'll never share your email"
  color="purple"
/>
```

#### 6. Select
**File**: `lib/components/Select/Select.tsx`

**Props**:
- `label?: string` - Select label
- `name?: string` - Form field name
- `options?: Array<{value: string, label: string}>` - Options
- `helperText?: string` - Helper text
- `color?: string` - Color theme
- `size?: string` - Size variant

**Usage**:
```tsx
<Select 
  label="Choose an option"
  name="choice"
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  color="purple"
/>
```

#### 7. Switch
**File**: `lib/components/Switch/Switch.tsx`

**Props**:
- `label?: string` - Switch label
- `checked?: boolean` - Checked state
- `onChange?: (checked: boolean) => void` - Change handler
- `color?: string` - Color theme
- `name?: string` - Form field name

**Usage**:
```tsx
<Switch 
  label="Enable notifications"
  checked={true}
  onChange={(checked) => console.log(checked)}
  color="purple"
/>
```

#### 8. Checkbox
**File**: `lib/components/CheckboxRadio/CheckboxRadio.tsx`

**Props**:
- `label?: string` - Checkbox label
- `checked?: boolean` - Checked state
- `onChange?: (e) => void` - Change handler
- `color?: string` - Color theme
- `name?: string` - Form field name
- `helperText?: string` - Helper text

**Usage**:
```tsx
<Checkbox 
  label="I agree to terms"
  checked={false}
  color="purple"
  name="terms"
/>
```

#### 9. Radio
**File**: `lib/components/CheckboxRadio/CheckboxRadio.tsx`

**Props**:
- `label?: string` - Radio label
- `checked?: boolean` - Checked state
- `onChange?: (e) => void` - Change handler
- `color?: string` - Color theme
- `name?: string` - Form field name
- `value?: string` - Radio value

**Usage**:
```tsx
<Radio 
  label="Option 1"
  value="opt1"
  name="choice"
  color="red"
/>
```

#### 10. Hero
**File**: `lib/components/Hero/Hero.tsx`

**Props**:
- `backgroundImage?: string` - Background image URL
- `align?: "left" | "center"` - Content alignment
- `overlay?: boolean` - Enable dark overlay
- `children?: React.ReactNode` - Hero content

**Subcomponents**: `HeroContent`, `HeroEyebrow`, `HeroTitle`, `HeroSubtitle`, `HeroActions`

**Usage**:
```tsx
<Hero backgroundImage="/hero.jpg" overlay align="center">
  <HeroContent>
    <HeroEyebrow>Featured</HeroEyebrow>
    <HeroTitle>Welcome to Our Platform</HeroTitle>
    <HeroSubtitle>Build amazing things</HeroSubtitle>
    <HeroActions>
      <Button label="Get Started" color="red" />
    </HeroActions>
  </HeroContent>
</Hero>
```

#### 11. Call-to-Action (Cta)
**File**: `lib/components/Cta/Cta.tsx`

**Props**:
- `headline?: string` - CTA headline
- `body?: string` - CTA body text
- `imageSrc?: string` - Image URL
- `imageAlt?: string` - Image alt text
- `primaryLabel?: string` - Primary button label
- `primaryAction?: () => void` - Primary button action

**Usage**:
```tsx
<CtaSection 
  headline="Ready to get started?"
  body="Join thousands of satisfied customers"
  imageSrc="/cta-image.jpg"
  primaryLabel="Sign Up Now"
  primaryAction={() => console.log('clicked')}
/>
```

### Component Patterns

#### Composition Pattern

Some components support composition with subcomponents:

```tsx
// Card composition
<Card>
  <CardHeader>{/* header content */}</CardHeader>
  <CardBody>{/* main content */}</CardBody>
  <CardFooter>{/* footer content */}</CardFooter>
</Card>

// Hero composition
<Hero>
  <HeroContent>
    <HeroEyebrow>{/* small text */}</HeroEyebrow>
    <HeroTitle>{/* main title */}</HeroTitle>
    <HeroSubtitle>{/* subtitle */}</HeroSubtitle>
    <HeroActions>{/* buttons */}</HeroActions>
  </HeroContent>
</Hero>
```

#### Styling Pattern

All components use Tailwind CSS with this pattern:

```typescript
// 1. Base styles (common to all variants)
const base = "inline-block font-bold rounded-full ...";

// 2. Variant-specific styles
const variants = {
  solid: {
    red: "bg-red-500 text-white",
    purple: "bg-purple-500 text-white",
  },
  outline: {
    red: "border border-red-500 text-red-500",
    purple: "border border-purple-500 text-purple-500",
  }
};

// 3. Combine with template literals
return (
  <button className={`${base} ${variants[variant][color]}`}>
    {children}
  </button>
);
```

#### Props Mirroring

Every React component has a matching PHP Props class:

**TypeScript**:
```typescript
// lib/components/Button/Button.tsx
export interface ButtonProps {
  label: string;
  color?: "red" | "purple";
  variant?: "solid" | "outline";
}
```

**PHP**:
```php
// adapters/symfony/src/Component/Button/ButtonProps.php
readonly class ButtonProps {
    public function __construct(
        public string $label,
        public ?string $color = null,
        public ?string $variant = null,
    ) {}
}
```

---

## Development Workflow

### Local Development Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd ui-library

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Opens Vite dev server at http://localhost:5173
```

### Storybook Development

```bash
# Start Storybook
npm run storybook

# Opens at http://localhost:6006
```

**Storybook Features**:
- Interactive component documentation
- All component variants and states
- Accessibility testing (`@storybook/addon-a11y`)
- Responsive viewport testing
- Props controls for live editing
- Vitest integration for component tests

**Writing Stories**:
```typescript
// src/stories/components/UI/Button.stories.ts

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../lib/components/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Button',
    color: 'red',
    variant: 'solid',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    color: 'purple',
    variant: 'outline',
  },
};
```

### Adding a New Component

**Step 1: Create React Component**
```typescript
// lib/components/NewComponent/NewComponent.tsx

import React from 'react';

export interface NewComponentProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const NewComponent: React.FC<NewComponentProps> = ({
  title,
  variant = 'primary'
}) => {
  return (
    <div className={`new-component ${variant}`}>
      <h2>{title}</h2>
    </div>
  );
};
```

**Step 2: Export from lib/index.ts**
```typescript
// lib/index.ts

export { NewComponent, type NewComponentProps } from './components/NewComponent/NewComponent';
```

**Step 3: Add to Hydration Registry**
```typescript
// lib/hydration.ts

import { NewComponent } from './components/NewComponent/NewComponent';

const componentRegistry: Record<string, React.ComponentType<any>> = {
  // ... existing components
  NewComponent,  // Add here
};
```

**Step 4: Create PHP Props Class**
```php
<?php
// adapters/symfony/src/Component/NewComponent/NewComponentProps.php

namespace UiLibrary\SymfonyAdapter\Component\NewComponent;

readonly class NewComponentProps
{
    public function __construct(
        public string $title,
        public ?string $variant = null,
    ) {}

    public function toArray(): array
    {
        $props = ['title' => $this->title];
        
        if ($this->variant !== null) {
            $props['variant'] = $this->variant;
        }
        
        return $props;
    }
}
```

**Step 5: Create Storybook Story**
```typescript
// src/stories/components/UI/NewComponent.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from '../../../../lib/components/NewComponent/NewComponent';

const meta: Meta<typeof NewComponent> = {
  title: 'UI/NewComponent',
  component: NewComponent,
};

export default meta;
type Story = StoryObj<typeof NewComponent>;

export const Primary: Story = {
  args: {
    title: 'Hello World',
    variant: 'primary',
  },
};
```

**Step 6: Test in Symfony**
```php
// Controller
$component = new NewComponentProps(
    title: 'Test Component',
    variant: 'primary'
);

return $this->render('test.html.twig', [
    'component' => $component
]);
```

```twig
{# Template #}
{{ ui_component('NewComponent', component) }}
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Structure**:
- Vitest for unit tests
- Playwright for browser tests
- Storybook integration tests
- Accessibility tests with `@storybook/addon-a11y`

### Building for Production

```bash
# Build library
npm run build

# Output in dist/
# - ui-library.mjs, ui-library.cjs
# - hydration.mjs, hydration.cjs
# - style.css
# - *.d.ts (TypeScript definitions)
```

### Publishing to npm

```bash
# 1. Update version in package.json
npm version patch  # or minor, major

# 2. Build
npm run build

# 3. Publish
npm publish

# Library is now available:
# npm install ui-library
```

---

## Installation & Usage

### Installation

#### For Frontend Developers (React)

```bash
# Install via npm
npm install ui-library

# Or yarn
yarn add ui-library

# Or pnpm
pnpm add ui-library
```

**Peer Dependencies** (must be installed):
```bash
npm install react react-dom
```

#### For Backend Developers (Symfony)

```bash
# Install Symfony adapter
composer require ui-library/symfony-adapter
```

**Requirements**:
- PHP 8.1+
- Symfony 6.0+ or 7.0+
- Twig 3.0+

### Frontend Usage

#### Option 1: Direct React Usage

```typescript
// app.tsx
import React from 'react';
import { Button, Alert, Card } from 'ui-library';
import 'ui-library/styles';

function App() {
  return (
    <div>
      <h1>My Application</h1>
      
      <Button 
        label="Click Me" 
        color="red" 
        variant="solid"
        onClick={() => alert('Clicked!')}
      />
      
      <Alert variant="info" title="Welcome">
        This is an information message.
      </Alert>
      
      <Card variant="elevated" accent="purple">
        <h3>Card Title</h3>
        <p>Card content</p>
      </Card>
    </div>
  );
}

export default App;
```

#### Option 2: Hydration Mode (with Symfony)

```javascript
// assets/app.js

import { hydrate } from 'ui-library/hydration';
import 'ui-library/styles';

// Automatically hydrates all [data-ui-component] elements
hydrate();

// Or with custom root element
const container = document.getElementById('app');
const cleanup = hydrate(container);

// Later: cleanup if needed
// cleanup();
```

### Backend Usage (Symfony)

#### Step 1: Register Bundle

**With Symfony Flex** (automatic):
```bash
composer require ui-library/symfony-adapter
# Bundle is auto-registered
```

**Without Symfony Flex** (manual):
```php
// config/bundles.php

return [
    // ... other bundles
    UiLibrary\SymfonyAdapter\Bundle\UiLibraryBundle::class => ['all' => true],
];
```

#### Step 2: Use in Controllers

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use UiLibrary\SymfonyAdapter\Component\Button\ButtonProps;
use UiLibrary\SymfonyAdapter\Component\Alert\AlertProps;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        // Create props objects
        $primaryButton = new ButtonProps(
            label: 'Get Started',
            color: 'red',
            variant: 'solid',
            size: 'large'
        );
        
        $alert = new AlertProps(
            title: 'Welcome',
            variant: 'info',
            dismissible: true
        );
        
        return $this->render('home/index.html.twig', [
            'primaryButton' => $primaryButton,
            'alert' => $alert,
        ]);
    }
}
```

#### Step 3: Use in Twig Templates

```twig
{# templates/home/index.html.twig #}

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    
    {# Include compiled CSS #}
    <link rel="stylesheet" href="{{ asset('build/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Welcome to Our Platform</h1>
        
        {# Use with Props object from controller #}
        {{ ui_component('Button', primaryButton) }}
        
        {# Or use with inline array #}
        {{ ui_component('Button', {
            'label': 'Learn More',
            'color': 'purple',
            'variant': 'outline'
        }) }}
        
        {# Alert component #}
        {{ ui_component('Alert', alert) }}
        
        {# Card component #}
        {{ ui_component('Card', {
            'variant': 'elevated',
            'accent': 'purple',
            'hoverable': true
        }) }}
    </div>
    
    {# Include JavaScript for hydration #}
    <script src="{{ asset('build/app.js') }}"></script>
</body>
</html>
```

### Complete Full-Stack Example

**Backend: Controller**
```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use UiLibrary\SymfonyAdapter\Component\Hero\HeroProps;
use UiLibrary\SymfonyAdapter\Component\Button\ButtonProps;
use UiLibrary\SymfonyAdapter\Component\Card\CardProps;

class LandingController extends AbstractController
{
    #[Route('/landing', name: 'landing')]
    public function landing(): Response
    {
        return $this->render('landing/index.html.twig', [
            'hero' => new HeroProps(
                backgroundImage: '/images/hero-bg.jpg',
                align: 'center',
                overlay: true
            ),
            'ctaButton' => new ButtonProps(
                label: 'Start Free Trial',
                color: 'red',
                variant: 'solid',
                size: 'large'
            ),
        ]);
    }
}
```

**Backend: Twig Template**
```twig
{# templates/landing/index.html.twig #}

{% extends 'base.html.twig' %}

{% block body %}
    {# Hero Section #}
    {{ ui_component('Hero', hero) }}
    
    <div class="container mx-auto px-4 py-16">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-4">Features</h2>
            <p class="text-xl text-gray-600">Everything you need to succeed</p>
        </div>
        
        {# Feature Cards #}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {% for i in 1..3 %}
                {{ ui_component('Card', {
                    'variant': 'elevated',
                    'accent': cycle(['purple', 'red', 'purple'], i),
                    'hoverable': true
                }) }}
            {% endfor %}
        </div>
        
        {# CTA Section #}
        <div class="text-center mt-16">
            {{ ui_component('Button', ctaButton) }}
        </div>
    </div>
{% endblock %}
```

**Frontend: Hydration Setup**
```javascript
// assets/app.js

import { hydrate } from 'ui-library/hydration';
import 'ui-library/styles';

// Import any additional styles
import './styles/app.css';

// Hydrate all components on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    hydrate();
    console.log('UI components hydrated');
  });
} else {
  hydrate();
  console.log('UI components hydrated');
}

// Optional: Add event listeners for dynamic content
document.addEventListener('htmx:afterSwap', () => {
  // Re-hydrate after HTMX swaps content
  hydrate();
});
```

**Build Configuration (Webpack Encore)**
```javascript
// webpack.config.js

const Encore = require('@symfony/webpack-encore');

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .addEntry('app', './assets/app.js')
  .enableSingleRuntimeChunk()
  .enablePostCssLoader()
  .enableReactPreset()
  .enableTypeScriptLoader();

module.exports = Encore.getWebpackConfig();
```

### TypeScript Support

```typescript
// Full type safety in TypeScript projects

import { 
  Button, 
  type ButtonProps,
  Alert,
  type AlertProps,
  type AlertVariant 
} from 'ui-library';

// Type-safe props
const buttonProps: ButtonProps = {
  label: 'Click Me',
  color: 'red',    // Type-checked: only 'red' | 'purple'
  variant: 'solid', // Type-checked: only 'solid' | 'outline'
  size: 'medium',  // Type-checked: only 'small' | 'medium' | 'large'
};

// Type-safe component usage
<Button {...buttonProps} />

// Type-safe variant
const alertVariant: AlertVariant = 'info'; // 'info' | 'success' | 'warning' | 'error'

<Alert variant={alertVariant} title="Message">
  Content here
</Alert>
```

---

## Advanced Topics

### Custom Styling

#### Extending Tailwind Config

```javascript
// Your project's tailwind.config.js

import uiLibraryConfig from 'ui-library/tailwind.config';

export default {
  // Extend the UI Library's Tailwind config
  presets: [uiLibraryConfig],
  
  // Add your custom configuration
  theme: {
    extend: {
      colors: {
        // Your custom colors
        custom: {
          primary: '#123456',
        }
      }
    }
  },
  
  // Include UI Library components in content scanning
  content: [
    './templates/**/*.twig',
    './assets/**/*.{js,jsx,ts,tsx}',
    './node_modules/ui-library/dist/**/*.{js,mjs}',
  ],
};
```

#### Custom Component Styling

```typescript
// Use className prop where available
<Alert 
  variant="info" 
  title="Custom"
  className="my-custom-class shadow-2xl"
>
  Content
</Alert>
```

### Performance Optimization

#### Code Splitting

```javascript
// Load hydration only when needed
const hydrateComponents = async () => {
  const { hydrate } = await import('ui-library/hydration');
  await import('ui-library/styles');
  hydrate();
};

// Hydrate on interaction
document.addEventListener('DOMContentLoaded', () => {
  // Delay hydration for better initial page load
  setTimeout(hydrateComponents, 100);
});
```

#### Selective Imports

```typescript
// Import only what you need (tree-shaking friendly)
import { Button } from 'ui-library';
// Instead of: import * as UiLibrary from 'ui-library';
```

### Integration with Other Frameworks

#### Next.js

```typescript
// pages/_app.tsx
import 'ui-library/styles';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// pages/index.tsx
import { Button, Alert } from 'ui-library';

export default function Home() {
  return (
    <div>
      <Button label="Next.js Button" color="red" />
      <Alert variant="info">Works with Next.js!</Alert>
    </div>
  );
}
```

#### Laravel

```php
// Similar to Symfony, create a helper or view composer
// resources/views/components/ui-component.blade.php

@php
$props = json_encode($attributes->get('props', []));
$component = $attributes->get('component');
@endphp

<div data-ui-component="{{ $component }}" data-ui-props="{{ $props }}"></div>

// Usage in Blade
<x-ui-component component="Button" :props="['label' => 'Click Me', 'color' => 'red']" />
```

---

## Troubleshooting

### Common Issues

#### Components Not Rendering

**Symptom**: Empty divs, no React components visible

**Solutions**:
1. Check that hydration is called:
   ```javascript
   import { hydrate } from 'ui-library/hydration';
   hydrate();
   ```

2. Verify styles are imported:
   ```javascript
   import 'ui-library/styles';
   ```

3. Check browser console for errors

4. Verify React and ReactDOM are installed:
   ```bash
   npm list react react-dom
   ```

#### Styles Missing

**Symptom**: Components render but look unstyled

**Solutions**:
1. Import styles in your entry point:
   ```javascript
   import 'ui-library/styles';
   ```

2. Check CSS is included in build output

3. Verify Tailwind CSS is processing correctly

#### Twig Function Not Found

**Symptom**: `Unknown "ui_component" function`

**Solutions**:
1. Verify bundle is registered:
   ```bash
   php bin/console debug:container UiComponentExtension
   ```

2. Clear Symfony cache:
   ```bash
   php bin/console cache:clear
   ```

3. Check `config/bundles.php` includes:
   ```php
   UiLibrary\SymfonyAdapter\Bundle\UiLibraryBundle::class => ['all' => true],
   ```

#### TypeScript Errors

**Symptom**: Type errors when importing components

**Solutions**:
1. Ensure TypeScript finds definitions:
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "moduleResolution": "node",
       "esModuleInterop": true
     }
   }
   ```

2. Restart TypeScript server in IDE

3. Verify `node_modules/ui-library/dist/index.d.ts` exists

---

## Best Practices

### Component Usage

1. **Use Props Objects in Controllers**
   ```php
   // Good: Type-safe and reusable
   $button = new ButtonProps(label: 'Click', color: 'red');
   
   // Avoid: Inline arrays lose type safety
   {{ ui_component('Button', {'label': 'Click', 'color': 'red'}) }}
   ```

2. **Import Only What You Need**
   ```typescript
   // Good: Tree-shakeable
   import { Button, Alert } from 'ui-library';
   
   // Avoid: Imports everything
   import * as UiLibrary from 'ui-library';
   ```

3. **Use TypeScript**
   ```typescript
   // Good: Full type safety
   const props: ButtonProps = { label: 'Click', color: 'red' };
   
   // Avoid: No type checking
   const props = { label: 'Click', color: 'red' };
   ```

### Performance

1. **Hydrate Once**
   ```javascript
   // Good: Single hydration call
   document.addEventListener('DOMContentLoaded', () => hydrate());
   
   // Avoid: Multiple hydration calls
   hydrate();
   hydrate();
   ```

2. **Use Code Splitting**
   ```javascript
   // Good: Load hydration asynchronously
   import('ui-library/hydration').then(({ hydrate }) => hydrate());
   ```

3. **Optimize Images**
   - Use appropriate image formats (WebP, AVIF)
   - Lazy load images in Hero and Cta components

### Maintainability

1. **Keep Props Classes in Sync**
   - When updating TypeScript interfaces, update PHP Props classes
   - When adding new props, update both sides

2. **Document Custom Components**
   - Create Storybook stories for all components
   - Add JSDoc comments to TypeScript interfaces

3. **Test Across Stack**
   - Test React components in Storybook
   - Test Symfony integration in browser
   - Test hydration with actual server-rendered HTML

---

## Contributing

### Development Setup

```bash
# Clone repository
git clone <repository-url>
cd ui-library

# Install dependencies
npm install

# Start development
npm run dev          # Vite dev server
npm run storybook    # Storybook
```

### Adding Features

1. Create React component in `lib/components/`
2. Export from `lib/index.ts`
3. Add to `lib/hydration.ts` registry
4. Create matching PHP Props class in `adapters/symfony/src/Component/`
5. Add Storybook story in `src/stories/`
6. Update documentation

### Testing Changes

```bash
# Run tests
npm test

# Build library
npm run build

# Test in Symfony project
cd ../symfony-project
npm link ../ui-library
```

---

## License

MIT License - See LICENSE file for details

---

## Credits

- React Team for React 19
- Tailwind Labs for Tailwind CSS
- Symfony Team for Symfony Framework
- Vite Team for build tooling
- Storybook Team for component documentation

---

## Support

- **Documentation**: See README.md and this technical documentation
- **Issues**: Report bugs and feature requests on GitHub
- **Community**: Join discussions on GitHub Discussions

---

**Last Updated**: December 2, 2025  
**Version**: 1.0.0

