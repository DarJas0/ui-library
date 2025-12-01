import type { Meta, StoryObj } from "@storybook/react";
import {
  Hero,
  HeroActions,
  HeroContent,
  HeroSubtitle,
  HeroTitle,
} from "./Hero";
import { Button } from "../Button/Button";

const meta: Meta<typeof Hero> = {
  title: "Example/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: (args) => (
    <Hero
      {...args}
      backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      align="center"
    >
      <HeroContent className="items-center text-center space-y-5">
        <HeroTitle>Build beautiful UIs faster.</HeroTitle>
        <HeroSubtitle>
          A composable hero section that works seamlessly with your design
          system components.
        </HeroSubtitle>
        <HeroActions className="justify-center">
          <Button label="Get started" variant="solid" color="purple" />
          <Button label="View docs" variant="outline" color="purple" />
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const LeftAligned: Story = {
  render: (args) => (
    <Hero
      {...args}
      backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      align="left"
    >
      <HeroContent>
        <div className="space-y-4">
          <HeroTitle>Launch your next project with confidence.</HeroTitle>
          <HeroSubtitle>
            Combine navigation, cards, inputs and more to build full pages
            directly in Storybook.
          </HeroSubtitle>
        </div>
        <HeroActions>
          <Button label="Get started" variant="solid" color="red" />
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const NoImage: Story = {
  render: (args) => (
    <Hero {...args} backgroundImage={undefined} align="center" overlay={false}>
      <HeroContent className="items-center text-center space-y-4">
        <HeroTitle>Hero without background image.</HeroTitle>
        <HeroSubtitle>
          You can also use a plain gradient or solid color background.
        </HeroSubtitle>
        <HeroActions className="justify-center">
          <Button label="Primary action" variant="solid" color="purple" />
          <Button label="Secondary action" variant="outline" color="purple" />
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

