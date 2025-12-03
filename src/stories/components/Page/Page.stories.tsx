import type { Meta, StoryObj } from "@storybook/react";


import { Navbar } from "../../../../lib/components/Navigation/Navbar";
import { Footer } from "../../../../lib/components/Footer/Footer";
import { Button } from "../../../../lib/components/Button/Button";
import { Input } from "../../../../lib/components/Input/Input";
import { Select } from "../../../../lib/components/Select/Select";
import { Checkbox, Radio } from "../../../../lib/components/CheckboxRadio/CheckboxRadio";
import { Switch } from "../../../../lib/components/Switch/Switch";
import { Badge } from "../../../../lib/components/Badge/Badge";
import { Card, CardBody, CardFooter, CardHeader } from "../../../../lib/components/Card/Card";
import { Alert } from "../../../../lib/components/Alert/Alert";


const meta: Meta = {
  title: "Pages/Page",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

const NAV_LINKS = [
  { label: "Products", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Pricing", href: "#" },
];

const FOOTER_COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "Marketing", href: "#" },
      { label: "Analytics", href: "#" },
      { label: "Commerce", href: "#" },
      { label: "Insights", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Pricing", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Guides", href: "#" },
      { label: "API Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Jobs", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Claim", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

function DemoContent() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <Alert title="Welcome" variant="info">You can explore all components below.</Alert>

      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Inputs</div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="email@example.com" accent="primary" />
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
            <Button size="small" variant="outline" accent="secondary" label="Cancel" />
            <Button size="small" variant="solid" accent="primary" label="Save" />
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
            <Badge accent="secondary" variant="solid">Purple</Badge>
            <Badge accent="primary" variant="outline">Red</Badge>
            <Badge accent="success" variant="soft">Green</Badge>
          </div>
          <div className="mt-4 flex items-center gap-6">
            <Radio name="plan" label="Basic" />
            <Radio name="plan" label="Pro" accent="primary" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export const LightMode: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar 
        logo="Valantic" 
        links={NAV_LINKS}
        actions={
          <>
            <Button label="Log in" variant="ghost" accent="neutral" size="small" />
            <Button label="Sign up" variant="solid" accent="primary" size="small" />
          </>
        }
      />
      <main className="flex-grow">
        <DemoContent />
      </main>
      <Footer copyright="Valantic" columns={FOOTER_COLUMNS} />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="min-h-screen bg-[#1E293B] text-gray-100 flex flex-col dark">
      <style>{`:root { --color-primary: #FF514B; }`}</style>
      <Navbar 
        logo={<span className="font-bold text-2xl text-white">valantic</span>}
        links={NAV_LINKS}
        className="bg-[#1E293B]/90 border-white/10"
        actions={
          <>
            <Button label="Contact" variant="outline" accent="primary" size="small" />
          </>
        }
      />
      <main className="flex-grow">
        <DemoContent />
      </main>
      <Footer copyright="Valantic" columns={FOOTER_COLUMNS} className="bg-[#1E293B] border-white/10" />
    </div>
  ),
};
