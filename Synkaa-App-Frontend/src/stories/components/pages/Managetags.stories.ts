import type { Meta, StoryObj } from "@storybook/react";

import { Managetags } from "./Managetags";

const meta = {
  component: Managetags,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Managetags>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const TagsMangement: Story = {};
