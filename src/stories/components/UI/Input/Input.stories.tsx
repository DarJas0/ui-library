import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    variant: { control: "select", options: ["default", "success", "error"] },
    accent: { control: "select", options: ["primary", "secondary", "neutral"] },
  },
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    helperText: "We'll never share your email.",
    size: "medium",
    variant: "default",
    accent: "secondary",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <span>@</span>,
    iconPosition: "left",
  },
};

export const ErrorState: Story = {
  args: {
    variant: "error",
    helperText: "Please enter a valid email address.",
    defaultValue: "invalid-email",
  },
};

export const SuccessState: Story = {
  args: {
    variant: "success",
    helperText: "Username is available!",
    defaultValue: "johndoe",
  },
};

export const PrimaryAccent: Story = {
  args: {
    accent: "primary",
    label: "Primary Accent",
  },
};


