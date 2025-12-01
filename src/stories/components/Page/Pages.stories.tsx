import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Header } from "../Navigation/Header/Header";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { Select } from "../UI/Select/Select";
import { Checkbox, Radio } from "../UI/CheckboxRadio/CheckboxRadio";
import { Switch } from "../UI/Switch/Switch";
import { Badge } from "../UI/Badge/Badge";
import { Card, CardBody, CardFooter, CardHeader } from "../UI/Card/Card";
import { Alert } from "../Alert/Alert";
import {
  Hero,
  HeroActions,
  HeroContent,
  HeroSubtitle,
  HeroTitle,
} from "../UI/Hero/Hero";
import { CtaSection } from "../UI/Cta/Cta";

const meta: Meta = {
  title: "Pages/Showcases",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

function DemoContent() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 space-y-8">
      <Header onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}} />

      <Alert title="Welcome" variant="info">You can explore all components below.</Alert>

      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Inputs</div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="email@example.com" color="red" />
            <Select label="Country">
              <option>Germany</option>
              <option>Switzerland</option>
              <option>Austria</option>
            </Select>
            <div className="flex items-center gap-6">
              <Checkbox label="Subscribe" />
              <Switch label="Notifications" />
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex justify-end gap-2">
            <Button size="small" variant="outline" color="purple" label="Cancel" />
            <Button size="small" variant="solid" color="red" label="Save" />
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Badges & Radios</div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge color="purple" variant="solid">Purple</Badge>
            <Badge color="red" variant="outline">Red</Badge>
            <Badge color="green" variant="soft">Green</Badge>
          </div>
          <div className="mt-4 flex items-center gap-6">
            <Radio name="plan" label="Basic" />
            <Radio name="plan" label="Pro" color="red" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export const Normal: Story = {
  render: () => (
    <div className="min-h-screen bg-white text-gray-900">
      <DemoContent />
    </div>
  ),
};

export const Valantic: Story = {
  render: () => (
    <div className="min-h-screen bg-white text-gray-900">
      <style>{`:root { --color-primary: #4C28D3; }`}</style>
      <DemoContent />
    </div>
  ),
};

export const WithHero: Story = {
  render: () => (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        align="left"
      >
        <HeroContent>
          <div className="space-y-4">
            <HeroTitle>Build full pages with your UI kit.</HeroTitle>
            <HeroSubtitle>
              Combine Header, Hero, Cards and form controls to rapidly prototype real product
              screens directly in Storybook.
            </HeroSubtitle>
          </div>
          <HeroActions>
            <Button label="Explore components" variant="solid" color="purple" />
            <Button label="View docs" variant="outline" color="purple" />
          </HeroActions>
        </HeroContent>
      </Hero>
      <CtaSection
        headline="Persönlich. Nah. In Ihrer Region."
        imageSrc="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
        imageAlt="Team working together in a modern office"
        body={
          <div className="space-y-3">
            <p>
              Wir begleiten Sie mit einem persönlichen Ansprechpartner, der Ihre Situation versteht und
              Sie auf Augenhöhe berät.
            </p>
            <p>
              Gemeinsam finden wir Lösungen, die wirklich zu Ihrem Leben, Ihrem Unternehmen und Ihrer Region passen.
            </p>
          </div>
        }
        primaryLabel="Jetzt beraten lassen"
      />
      <div className="mx-auto max-w-5xl px-6 pb-10">
        <DemoContent />
      </div>
    </div>
  ),
};

export const Dark: Story = {
  render: () => (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-100">
      <div className="mx-auto max-w-5xl px-6 py-8 space-y-8">
        <Header onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}} />
        <Alert title="Welcome" variant="info">Dark theme showcase</Alert>

        <Card className="bg-[#111218] border-gray-800">
          <CardHeader className="border-gray-800">
            <div className="text-lg font-semibold">Inputs</div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="email@example.com" color="red" />
              <Select label="Country">
                <option>Germany</option>
                <option>Switzerland</option>
                <option>Austria</option>
              </Select>
              <div className="flex items-center gap-6">
                <Checkbox label="Subscribe" />
                <Switch label="Notifications" />
              </div>
            </div>
          </CardBody>
          <CardFooter className="border-gray-800">
            <div className="flex justify-end gap-2">
              <Button size="small" variant="outline" color="purple" label="Cancel" />
              <Button size="small" variant="solid" color="red" label="Save" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
};


