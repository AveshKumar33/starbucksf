// import { contact } from './Contact';
import type { Meta, StoryObj } from "@storybook/react";

import { Contact } from "./Contact";

const meta = {
  component: Contact,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const ConatctModuloe: Story = {};
