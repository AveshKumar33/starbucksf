import { LatestUserAddedListing } from "./LatestUserAddedListing";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LatestUserAddedListing,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof LatestUserAddedListing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserAddedListing: Story = {};
