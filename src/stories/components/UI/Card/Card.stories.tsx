import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter, CardImage } from '../../../../../lib/components/Card/Card';
import { Button } from "../../../../../lib/components/Button/Button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    variant: "elevated",

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
    hoverable: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardImage 
        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        alt="Cover Image"
      />
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

export const CaseStudyGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 p-12">
      {/* Card 1: V-ZUG */}
      <Card hoverable className="h-full flex flex-col">
        <CardImage 
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="V-ZUG Case Study"
          logoSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/V-Zug_Logo.svg/2560px-V-Zug_Logo.svg.png"
        />
        <CardHeader 
          className="pb-0"
          title={
            <span>
              V-ZUG AI Assistant:<br />
              Intelligente Produktberatung<br />
              für eine nahtlose<br />
              Customer Journey
            </span>
          }
        />
        <CardFooter className="mt-auto border-none pt-4">
          <a href="#" className="text-primary font-bold uppercase text-xs tracking-wider flex items-center gap-2 hover:gap-3 transition-all">
            Weiterlesen <span>&rarr;</span>
          </a>
        </CardFooter>
      </Card>

      {/* Card 2: Toyota */}
      <Card hoverable className="h-full flex flex-col">
        <CardImage 
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Toyota Case Study"
          logoSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/2560px-Toyota_carlogo.svg.png"
        />
        <CardHeader 
          className="pb-0"
          title={
            <span>
              Conversational AI bei Toyota<br />
              verbessert den Kundenservice
            </span>
          }
        />
        <CardFooter className="mt-auto border-none pt-4">
          <a href="#" className="text-primary font-bold uppercase text-xs tracking-wider flex items-center gap-2 hover:gap-3 transition-all">
            Weiterlesen <span>&rarr;</span>
          </a>
        </CardFooter>
      </Card>

      {/* Card 3: COLONS */}
      <Card hoverable className="h-full flex flex-col">
        <CardImage 
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="COLONS Case Study"
          logoSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" // Placeholder for COLONS
        />
        <CardHeader 
          className="pb-0"
          title={
            <span>
              COLONS optimiert<br />
              Produktsuche und erschließt<br />
              neue Märkte mit KI<br />
              von valantic
            </span>
          }
        />
        <CardFooter className="mt-auto border-none pt-4">
          <a href="#" className="text-primary font-bold uppercase text-xs tracking-wider flex items-center gap-2 hover:gap-3 transition-all">
            Weiterlesen <span>&rarr;</span>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
};



