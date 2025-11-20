import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-webpack5-compiler-babel",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !prop.parent.fileName.includes("node_modules") : true),
    },
  },
  webpackFinal: async config => {
    if (config.module?.rules) {
      config.module.rules = config.module.rules.filter(rule => {
        if (rule && typeof rule === "object" && "test" in rule && rule.test instanceof RegExp) {
          return !rule.test.toString().includes("svg");
        }
        return true;
      });
    }

    config.module?.rules?.push({
      test: /\.svg$/i,
      oneOf: [
        {
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
        {
          type: "asset/resource",
        },
      ],
    });

    if (config.resolve) {
      config.resolve.modules = [...(config.resolve.modules || []), "node_modules", "src"];
    }

    return config;
  },
};

export default config;
