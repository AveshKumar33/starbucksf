import type { Meta, StoryObj } from "@storybook/react";

import { Conversation } from "./Conversation";

const meta = {
  component: Conversation,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Conversation>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const ConversationTemplate: Story = {};
