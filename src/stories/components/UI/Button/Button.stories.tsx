import type { Meta, StoryObj } from "@storybook/react";
import { Button } from '../../../../../lib/components/Button/Button';

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "link"],
    },
    accent: {
      control: "select",
      options: ["primary", "secondary", "neutral"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    block: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Button",
    variant: "solid",
    accent: "primary",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    accent: "primary",
    label: "Primary Action",
  },
};

export const Secondary: Story = {
  args: {
    accent: "secondary",
    label: "Secondary Action",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    label: "Outline Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Ghost Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    label: "Link Button",
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} icon={<span>👋</span>} label="Say Hello" />
      <Button {...args} icon={<span>➡️</span>} iconPosition="right" label="Next Step" />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    label: "Processing...",
  },
};

export const Block: Story = {
  args: {
    block: true,
    label: "Full Width Button",
  },
  decorators: [
    (Story) => (
      <div className="w-96 p-4 border border-dashed border-gray-300">
        <Story />
      </div>
    ),
  ],
};
