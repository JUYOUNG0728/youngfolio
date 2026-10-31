import type { Preview } from "@storybook/nextjs-vite";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

import "../styles/tokens.css";
import "../styles/globals.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        black: { name: "Black #101010", value: "#101010" },
        white: { name: "White", value: "#ffffff" },
        gray: { name: "Gray 10", value: "#f0f0f0" },
      },
    },
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        siteSm: {
          name: "Site sm 480",
          styles: { width: "480px", height: "900px" },
          type: "mobile",
        },
        siteMd: {
          name: "Site md 768",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        siteLg: {
          name: "Site lg 1280",
          styles: { width: "1280px", height: "900px" },
          type: "desktop",
        },
        siteXl: {
          name: "Site xl 1920",
          styles: { width: "1920px", height: "1080px" },
          type: "desktop",
        },
        siteMax: {
          name: "Site base 2048",
          styles: { width: "2048px", height: "1200px" },
          type: "desktop",
        },
      },
    },
    options: {
      storySort: {
        order: [
          "Design System",
          [
            "Introduction",
            "Foundations",
            [
              "Colors",
              "Typography",
              "Spacing",
              "Radius",
              "Border",
              "Shadow",
              "Breakpoints",
              "Z-Index",
              "Icons",
            ],
            "Components",
            [
              "Buttons",
              "Inputs",
              "Cards",
              "Badges",
              "Navigation",
              "Feedback",
            ],
            "Patterns",
          ],
        ],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "black" },
  },
  decorators: [
    (Story) => (
      <div className="text-white">
        <Story />
      </div>
    ),
  ],
};

export default preview;
