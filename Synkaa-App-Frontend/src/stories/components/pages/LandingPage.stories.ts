import type { Meta, StoryObj } from "@storybook/react";

import { LandingPage } from "./LandingPage";

const meta = {
  component: LandingPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const LandingMobilePage: Story = {};
