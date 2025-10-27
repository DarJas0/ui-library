import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/**
 * Der Button ist die zentrale Interaktionskomponente der UI-Library.
 * Er unterstützt Farben (red, purple), Varianten (solid, outline) und Größen (small, medium, large).
 */
const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"], // <— ✨ sorgt für Docs-Page
  parameters: {
    docs: {
      description: {
        component:
          "Ein universeller Button im Valantic-Design. Wähle zwischen Farbvarianten (Rot & Lila), Outline oder Solid, sowie unterschiedlichen Größen.",
      },
    },
  },
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["red", "purple"],
      description: "Bestimmt die Farbvariante des Buttons.",
    },
    variant: {
      control: "inline-radio",
      options: ["solid", "outline"],
      description: "Legt fest, ob der Button ausgefüllt oder nur umrandet ist.",
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
      description: "Steuert die Größe des Buttons.",
    },
    disabled: {
      control: "boolean",
      description: "Deaktiviert den Button.",
    },
    label: {
      control: "text",
      description: "Der sichtbare Text im Button.",
    },
  },
  args: {
    label: "Jetzt entdecken",
    color: "red",
    variant: "solid",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* === Stories für visuelle Varianten === */
export const RedSolid: Story = {};

export const RedOutline: Story = {
  args: { variant: "outline" },
};

export const PurpleSolid: Story = {
  args: { color: "purple" },
};

export const PurpleOutline: Story = {
  args: { color: "purple", variant: "outline" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
