import type { Meta, StoryObj } from "@storybook/react";

import { Sessionexpired } from "./sessionexpired";

const meta = {
  component: Sessionexpired,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Sessionexpired>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const TagsMangement: Story = {};
