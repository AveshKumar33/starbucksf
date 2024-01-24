import type { Meta, StoryObj } from "@storybook/react";

import { TableListing } from "./TableListing";

const meta = {
  component: TableListing,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof TableListing>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const TableListingTemplate: Story = {};
