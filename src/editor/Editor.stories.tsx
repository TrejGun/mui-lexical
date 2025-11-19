import type { Meta, StoryObj } from "@storybook/react";

import { Editor } from "./Editor";

const meta: Meta<typeof Editor> = {
  title: "Editor/Editor",
  component: Editor,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-featured Lexical Editor with all plugins enabled. Includes toolbar, markdown shortcuts, code highlighting, tables, images, videos, and more.",
      },
    },
  },
  decorators: [
    Story => (
      <>
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <Story />
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Default: Story = {
  name: "Default Editor",
  render: () => <Editor />,
};

export const InContainer: Story = {
  name: "Editor in Container",
  render: () => (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Editor />
    </div>
  ),
};

export const WithCustomHeight: Story = {
  name: "Editor with Fixed Height",
  render: () => (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        height: "800px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Editor />
    </div>
  ),
};

export const Compact: Story = {
  name: "Compact Editor",
  render: () => (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        border: "1px solid #e0e0e0",
        borderRadius: "4px",
        backgroundColor: "#fff",
      }}
    >
      <Editor />
    </div>
  ),
};
