import type { Meta, StoryObj } from "@storybook/react";

import { Dashboard } from "./Dashboard";

const meta = {
  component: Dashboard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

export const DashboardTemplate: Story = {};
