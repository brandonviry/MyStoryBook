import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

addons.setConfig({
  theme: create({
    brandTitle: "Motion Farmer",
    brandUrl: "/",
    brandImage: "/brand-logo.svg",
    brandTarget: "_self",
  }),
});
