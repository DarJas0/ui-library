import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "../../UI/Button/Button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    variant: "elevated",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  render: (args) => (
    <Card {...args} hoverable accent="purple">
      <CardHeader title="Card title" subtitle="Optional subtitle" actions={<Button size="small" variant="outline" color="purple" label="Action" />} />
      <CardBody>
        Body content goes here with a modern elevated surface and a subtle brand accent.
      </CardBody>
      <CardFooter>
        <div className="flex gap-2 justify-end w-full">
          <Button size="small" variant="outline" color="purple" label="Cancel" />
          <Button size="small" variant="solid" color="red" label="Save" />
        </div>
      </CardFooter>
    </Card>
  )
};

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Outline Card" subtitle="Subtle outline" />
      <CardBody>
        A minimal outline card suitable for lists and dense layouts.
      </CardBody>
    </Card>
  )
};

export const SoftWithMedia: Story = {
  args: { variant: "soft" },
  render: (args) => (
    <Card
      {...args}
      media={<img src="/vite.svg" alt="cover" className="h-40 w-full object-cover" />}
    >
      <CardHeader title="Soft Card" subtitle="With media" />
      <CardBody>
        Soft background with gentle border. Media slot on top.
      </CardBody>
    </Card>
  )
};


