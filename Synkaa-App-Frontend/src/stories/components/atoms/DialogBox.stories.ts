import type { Meta, StoryObj } from "@storybook/react";
import { DialogBox } from "./DialogBox";

const meta = {
  component: DialogBox,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DialogBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogBoxStory: Story = {};

// export const LoggedOut: Story = {};
