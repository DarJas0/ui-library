import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "inline-radio", options: ["gray", "purple", "red", "green", "yellow"] },
    variant: { control: "inline-radio", options: ["soft", "solid", "outline"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
  args: {
    children: "Badge",
    color: "purple",
    variant: "soft",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const SolidRed: Story = { args: { variant: "solid", color: "red" } };
export const OutlinePurple: Story = { args: { variant: "outline", color: "purple" } };


