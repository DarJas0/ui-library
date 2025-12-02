import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "../../UI/Button/Button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    variant: "elevated",
    padding: "normal",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outline", "soft", "ghost"],
    },
    accent: {
      control: "select",
      options: ["none", "primary", "secondary"],
    },
    padding: {
      control: "select",
      options: ["none", "compact", "normal", "relaxed"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader 
        title="Default Card" 
        subtitle="Standard elevated style" 
        action={<Button size="small" variant="outline" label="Options" />} 
      />
      <CardBody>
        This is the default card style. It uses a subtle shadow and white background to lift content from the page.
      </CardBody>
      <CardFooter>
        <Button size="small" variant="outline" label="Cancel" />
        <Button size="small" variant="solid" label="Save" />
      </CardFooter>
    </Card>
  )
};

export const ValanticPrimary: Story = {
  args: {
    accent: "primary",
    hoverable: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Valantic Primary" subtitle="Corporate Red Accent" />
      <CardBody>
        This card features the Valantic Red accent color (#FF0000) on the left edge. It is perfect for highlighting key content.
      </CardBody>
      <CardFooter>
        <span className="text-sm text-gray-400">Last updated 2 mins ago</span>
        <Button size="small" variant="solid" accent="primary" label="Action" />
      </CardFooter>
    </Card>
  )
};

export const ValanticSecondary: Story = {
  args: {
    accent: "secondary",
    variant: "soft",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Valantic Secondary" subtitle="Dark Blue Accent" />
      <CardBody>
        This variant uses the Dark Blue accent (#1E293B) combined with a soft background style.
      </CardBody>
    </Card>
  )
};

export const WithCoverImage: Story = {
  args: {
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    hoverable: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader 
        title="Rich Media Card" 
        subtitle="With cover image" 
        action={<div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">NEW</div>}
      />
      <CardBody>
        Cards can now feature a full-width cover image at the top. The image scales slightly on hover for a premium feel.
      </CardBody>
      <CardFooter>
        <Button size="small" variant="outline" label="Read More" />
      </CardFooter>
    </Card>
  )
};

export const InteractiveGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-8">
      <Card hoverable variant="outline">
        <CardHeader title="Feature One" />
        <CardBody>Interactive card with hover lift effect.</CardBody>
      </Card>
      <Card hoverable variant="outline" accent="primary">
        <CardHeader title="Feature Two" />
        <CardBody>Interactive card with primary accent.</CardBody>
      </Card>
      <Card hoverable variant="outline" accent="secondary">
        <CardHeader title="Feature Three" />
        <CardBody>Interactive card with secondary accent.</CardBody>
      </Card>
    </div>
  )
};



