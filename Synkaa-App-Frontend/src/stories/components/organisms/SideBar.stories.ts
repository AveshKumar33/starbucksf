import type { Meta, StoryObj } from "@storybook/react";
import { SideBar } from "./SideBar";

const meta = {
  component: SideBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavBar: Story = {};

// export const LoggedOut: Story = {};
