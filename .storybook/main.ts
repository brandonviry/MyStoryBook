import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  "staticDirs": ["../public"],
 // Assurez-vous que ce dossier contient votre icône
  managerHead: (head) => `
    ${head}
    <link rel="icon" href="/brand-logo.svg" />
  `,
};
export default config;
