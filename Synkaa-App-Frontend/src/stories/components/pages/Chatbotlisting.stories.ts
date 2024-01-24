// import { contact } from './Contact';
import type { Meta, StoryObj } from "@storybook/react";

import { Chatbotlisting } from "./Chatbotlisting";

const meta = {
  component: Chatbotlisting,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Chatbotlisting>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const ConatctModuloe: Story = {};
