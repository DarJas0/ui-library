import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    variant: { control: "inline-radio", options: ["default", "success", "error"] },
    color: { control: "inline-radio", options: ["purple", "red"] },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
    size: "medium",
    variant: "default",
    color: "purple",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Error: Story = { args: { variant: "error", helperText: "There is an error" } };
export const Success: Story = { args: { variant: "success", helperText: "Looks good" } };
export const LargeRed: Story = { args: { size: "large", color: "red" } };


