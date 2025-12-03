import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "../../../../lib/components/Footer/Footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Footer>;

const FOOTER_COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "Marketing", href: "#" },
      { label: "Analytics", href: "#" },
      { label: "Commerce", href: "#" },
      { label: "Insights", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Pricing", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Guides", href: "#" },
      { label: "API Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Jobs", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Claim", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export const Default: Story = {
  args: {
    copyright: "Valantic",
    columns: FOOTER_COLUMNS,
  },
};

export const WithLogo: Story = {
  args: {
    copyright: "Valantic",
    columns: FOOTER_COLUMNS,
    logo: <span className="font-bold text-2xl text-white">valantic</span>,
  },
};
