import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Radio } from "./CheckboxRadio";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox & Radio",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    accent: {
      control: "select",
      options: ["primary", "secondary", "neutral"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxDefault: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} label="Accept terms and conditions" />
      <Checkbox {...args} accent="primary" label="Subscribe to newsletter (Primary)" defaultChecked />
      <Checkbox {...args} accent="neutral" label="Remember me (Neutral)" />
      <Checkbox {...args} disabled label="Disabled option" />
      <Checkbox {...args} disabled defaultChecked label="Disabled checked" />
      <Checkbox {...args} helperText="This is a helpful description." label="With helper text" />
    </div>
  ),
};

export const RadioGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio name="plan" label="Basic Plan" defaultChecked />
      <Radio name="plan" label="Pro Plan (Primary)" accent="primary" />
      <Radio name="plan" label="Enterprise Plan (Neutral)" accent="neutral" />
      <Radio name="plan" label="Custom Plan (Disabled)" disabled />
      <Radio name="plan" label="With helper text" helperText="Additional details about this option." />
    </div>
  ),
};


