import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["soft", "solid", "outline"],
    },
    accent: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "info", "neutral"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
  },
  args: {
    children: "Badge",
    variant: "soft",
    accent: "primary",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const PrimarySolid: Story = {
  args: {
    variant: "solid",
    accent: "primary",
    children: "Primary",
  },
};

export const SecondaryOutline: Story = {
  args: {
    variant: "outline",
    accent: "secondary",
    children: "Secondary",
  },
};

export const Statuses: Story = {
  render: (args) => (
    <div className="flex gap-2 flex-wrap">
      <Badge {...args} accent="success">Success</Badge>
      <Badge {...args} accent="warning">Warning</Badge>
      <Badge {...args} accent="error">Error</Badge>
      <Badge {...args} accent="info">Info</Badge>
      <Badge {...args} accent="neutral">Neutral</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <span>★</span>,
    children: "Featured",
    accent: "warning",
  },
};


