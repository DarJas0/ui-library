import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Radio } from "./CheckboxRadio";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox & Radio",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxDefault: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Checkbox {...args} label="Accept terms" />
      <Checkbox {...args} color="red" label="Subscribe" />
      <Checkbox {...args} disabled label="Disabled" />
    </div>
  ),
};

export const RadioGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio name="plan" label="Basic" />
      <Radio name="plan" label="Pro" color="red" />
      <Radio name="plan" label="Enterprise" disabled />
    </div>
  ),
};


