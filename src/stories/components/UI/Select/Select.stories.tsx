import type { Meta, StoryObj } from "@storybook/react";
import { Select } from '../../../../../lib/components/Select/Select';

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    variant: { control: "select", options: ["default", "success", "error"] },
    accent: { control: "select", options: ["primary", "secondary", "neutral"] },
  },
  args: {
    label: "Country",
    helperText: "Choose an option",
    size: "medium",
    variant: "default",
    accent: "secondary",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <option>Germany</option>
      <option>Switzerland</option>
      <option>Austria</option>
    </Select>
  )
};

export const PrimaryAccent: Story = {
  args: {
    accent: "primary",
    label: "Primary Accent",
  },
  render: (args) => (
    <Select {...args}>
      <option>Option A</option>
      <option>Option B</option>
    </Select>
  )
};

export const ErrorState: Story = {
  args: {
    variant: "error",
    helperText: "Please select a valid option",
  },
  render: (args) => (
    <Select {...args}>
      <option>Invalid Option</option>
    </Select>
  )
};
