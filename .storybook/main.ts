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
  webpackFinal: config => {
    const fileLoaderRule = config.module?.rules?.find(rule => {
      if (rule && typeof rule === "object" && "test" in rule) {
        const test = rule.test;
        if (test instanceof RegExp) {
          return test.toString().includes("svg");
        }
        if (typeof test === "string") {
          return test.includes("svg");
        }
      }
      return false;
    });

    if (fileLoaderRule && typeof fileLoaderRule === "object") {
      (fileLoaderRule as { exclude?: RegExp }).exclude = /\.svg$/i;
    }

    config.module?.rules?.push({
      test: /\.svg$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });

    if (config.resolve) {
      config.resolve.modules = [...(config.resolve.modules || []), "node_modules", "src"];
    }

    return config;
  },
};

export default config;
