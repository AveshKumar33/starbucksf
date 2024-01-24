// import { contact } from './Contact';
import type { Meta, StoryObj } from "@storybook/react";

import { Addeditterm } from "./addeditterm";

const meta = {
  component: Addeditterm,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Addeditterm>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const AddEditTerm: Story = {};
