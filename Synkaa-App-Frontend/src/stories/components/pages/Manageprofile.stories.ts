import type { Meta, StoryObj } from "@storybook/react";

import { Manageprofile } from "./Manageprofile";

const meta = {
  component: Manageprofile,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Manageprofile>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const TagsMangement: Story = {};
