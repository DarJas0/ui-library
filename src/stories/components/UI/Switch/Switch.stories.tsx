import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import React from "react";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    defaultChecked: true,
    color: "purple",
    label: "Notifications",
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
export const Red: Story = { args: { color: "red" } };
export const Off: Story = { args: { defaultChecked: false } };

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


