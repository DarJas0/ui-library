import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    color: { control: "inline-radio", options: ["purple", "red"] },
  },
  args: {
    label: "Country",
    helperText: "Choose an option",
    size: "medium",
    color: "purple",
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

export const LargeRed: Story = {
  args: { size: "large", color: "red" },
  render: (args) => (
    <Select {...args}>
      <option>Option A</option>
      <option>Option B</option>
    </Select>
  )
};


