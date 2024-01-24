import type { Meta, StoryObj } from "@storybook/react";
import { DeleteQR } from "./DeletQRPopup";

const meta = {
  component: DeleteQR,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DeleteQR>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteQrMOdal: Story = {};

// export const LoggedOut: Story = {};
