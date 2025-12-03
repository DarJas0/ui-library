import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from '../../../../../lib/components/Switch/Switch';
import React from "react";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    accent: {
      control: "select",
      options: ["primary", "secondary", "success", "neutral"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
  },
  args: {
    defaultChecked: true,
    accent: "secondary",
    label: "Notifications",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    accent: "primary",
    label: "Primary Accent",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Small Switch",
  },
};

export const Off: Story = {
  args: {
    defaultChecked: false,
    label: "Disabled State",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [on, setOn] = React.useState(true);
    return (
      <Switch
        {...args}
        checked={on}
        onChange={(v) => setOn(v)}
        label={on ? "Enabled" : "Disabled"}
      />
    );
  }
};


