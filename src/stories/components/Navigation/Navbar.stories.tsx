import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Navbar } from "../../../../lib/components/Navigation/Navbar";
import { Button } from "../../../../lib/components/Button/Button";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navigation/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const NAV_LINKS = [
  { label: "Products", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Pricing", href: "#" },
];

export const Default: Story = {
  args: {
    logo: "Valantic",
    links: NAV_LINKS,
    actions: (
      <>
        <Button label="Log in" variant="ghost" accent="neutral" size="small" />
        <Button label="Sign up" variant="solid" accent="primary" size="small" />
      </>
    ),
  },
};

export const WithCustomLogo: Story = {
  args: {
    logo: <span className="font-bold text-2xl text-primary">valantic</span>,
    links: NAV_LINKS,
    actions: (
      <>
        <Button label="Contact" variant="outline" accent="primary" size="small" />
      </>
    ),
  },
};

export const DarkMode: Story = {
  args: {
    logo: "Valantic",
    links: NAV_LINKS,
    className: "dark",
    actions: (
      <>
        <Button label="Log in" variant="ghost" accent="neutral" size="small" className="dark:text-white" />
        <Button label="Sign up" variant="solid" accent="primary" size="small" />
      </>
    ),
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: (args) => (
    <div className="dark bg-gray-900 min-h-[200px]">
      <Navbar {...args} />
    </div>
  ),
};
