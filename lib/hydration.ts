import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Button } from './components/Button/Button';
import { Alert } from './components/Alert/Alert';
import { Badge } from './components/Badge/Badge';
import { Card, CardHeader, CardBody, CardFooter } from './components/Card/Card';
import { Input } from './components/Input/Input';
import { Select } from './components/Select/Select';
import { Switch } from './components/Switch/Switch';
import { Checkbox, Radio } from './components/CheckboxRadio/CheckboxRadio';
import { Hero, HeroContent, HeroEyebrow, HeroTitle, HeroSubtitle, HeroActions } from './components/Hero/Hero';
import { CtaSection } from './components/Cta/Cta';

// Component registry mapping component names to React components
const componentRegistry: Record<string, React.ComponentType<any>> = {
  Button,
  Alert,
  Badge,
  Card,
  Input,
  Select,
  Switch,
  Checkbox,
  Radio,
  Hero,
  Cta: CtaSection, // Map 'Cta' to CtaSection
};

// Special handling for Card subcomponents
const cardSubcomponents: Record<string, React.ComponentType<any>> = {
  CardHeader,
  CardBody,
  CardFooter,
};

const heroSubcomponents: Record<string, React.ComponentType<any>> = {
  HeroContent,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
};

/**
 * Hydrates all UI components found in the DOM with data-ui-component attributes.
 * This function should be called after the DOM is loaded.
 * 
 * @param rootElement - Optional root element to search within. Defaults to document.body
 * @returns Cleanup function to unmount all hydrated components
 */
export function hydrate(rootElement: HTMLElement = document.body): () => void {
  const elements = rootElement.querySelectorAll('[data-ui-component]');
  const roots: Root[] = [];

  elements.forEach((element) => {
    const componentName = element.getAttribute('data-ui-component');
    const propsJson = element.getAttribute('data-ui-props');

    if (!componentName) {
      console.warn('Element has data-ui-component but no component name', element);
      return;
    }

    // Get component from registry
    let Component = componentRegistry[componentName] || 
                    cardSubcomponents[componentName] || 
                    heroSubcomponents[componentName];

    if (!Component) {
      console.warn(`Component "${componentName}" not found in registry`, element);
      return;
    }

    // Parse props
    let props = {};
    if (propsJson) {
      try {
        props = JSON.parse(propsJson);
      } catch (e) {
        console.error(`Failed to parse props for ${componentName}:`, e);
        return;
      }
    }

    // Convert string children to React nodes if present
    if (props.children && typeof props.children === 'string') {
      props.children = props.children;
    }

    // Create React root and render
    try {
      const root = createRoot(element as HTMLElement);
      root.render(<Component {...props} />);
      roots.push(root);
    } catch (error) {
      console.error(`Failed to hydrate component "${componentName}":`, error);
    }
  });

  // Return cleanup function
  return () => {
    roots.forEach(root => root.unmount());
  };
}

/**
 * Auto-hydrate when DOM is ready (if not in SSR context)
 */
if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    hydrate();
  });
} else if (typeof window !== 'undefined') {
  // DOM already loaded
  hydrate();
}

