import type { Meta, StoryObj } from "@storybook/react";

import { SettingLandingModify } from "./SettingLandingModify";

const meta = {
  component: SettingLandingModify,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof SettingLandingModify>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const ModifyLanding: Story = {};
