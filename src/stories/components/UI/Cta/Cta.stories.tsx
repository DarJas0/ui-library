import type { Meta, StoryObj } from "@storybook/react";
import { CtaSection } from "./Cta";
import type { CtaProps } from "./Cta";

const meta: Meta<typeof CtaSection> = {
  title: "Example/Cta",
  component: CtaSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dark", "gradient"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CtaSection>;

const defaultArgs: CtaProps = {
  headline: "Persönlich. Nah. In Ihrer Region.",
  imageSrc: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Team working together in a modern office",
  body: (
    <div className="space-y-3">
      <p>
        Wir begleiten Sie mit einem persönlichen Ansprechpartner, der Ihre Situation versteht und
        Sie auf Augenhöhe berät.
      </p>
      <p>
        Gemeinsam finden wir Lösungen, die wirklich zu Ihrem Leben, Ihrem Unternehmen und Ihrer Region passen.
      </p>
    </div>
  ),
  primaryLabel: "Jetzt beraten lassen",
  secondaryLabel: "Mehr erfahren",
};

export const Dark: Story = {
  args: {
    ...defaultArgs,
    variant: "dark",
  },
};

export const Gradient: Story = {
  args: {
    ...defaultArgs,
    variant: "gradient",
  },
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    variant: "default",
  },
};
