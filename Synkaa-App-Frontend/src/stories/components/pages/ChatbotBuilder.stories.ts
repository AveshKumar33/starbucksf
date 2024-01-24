import type { Meta, StoryObj } from "@storybook/react";

import { ChatbotBuilderStory } from "./ChatbotBuilderStory";

const meta = {
  component: ChatbotBuilderStory,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChatbotBuilderStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChatbotBuilder: Story = {};
