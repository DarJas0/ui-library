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
  Cta: CtaSection,
};

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

export function hydrate(rootElement: HTMLElement = document.body): () => void {
  const elements = rootElement.querySelectorAll('[data-ui-component]');
  const roots: Root[] = [];

  elements.forEach((element) => {
    const componentName = element.getAttribute('data-ui-component');
    const propsJson = element.getAttribute('data-ui-props');

    if (!componentName) {
      return;
    }

    let Component = componentRegistry[componentName] || 
                    cardSubcomponents[componentName] || 
                    heroSubcomponents[componentName];

    if (!Component) {
      return;
    }

    let props: Record<string, any> = {};
    
    if (propsJson) {
      try {
        props = JSON.parse(propsJson);
      } catch (e) {
        return;
      }
    }

    if (props.children && typeof props.children === 'string') {
      props.children = props.children;
    }

    try {
      const root = createRoot(element as HTMLElement);
      root.render(<Component {...props} />);
      roots.push(root);
    } catch (error) {
    }
  });

  return () => {
    roots.forEach(root => root.unmount());
  };
}

if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    hydrate();
  });
} else if (typeof window !== 'undefined') {
  hydrate();
}