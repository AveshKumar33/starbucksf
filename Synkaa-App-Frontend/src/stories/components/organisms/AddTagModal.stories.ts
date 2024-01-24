import type { Meta, StoryObj } from "@storybook/react";
import { AddTagModal } from "./AddTagModal";

const meta = {
  component: AddTagModal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof AddTagModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddTagMOdal: Story = {};

// export const LoggedOut: Story = {};
