import type { Meta, StoryObj } from "@storybook/react";
import { DeleteConfirmation } from "./DeleteConfirmationmodal";

const meta = {
  component: DeleteConfirmation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DeleteConfirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteConfirmationQrMOdal: Story = {};

// export const LoggedOut: Story = {};
