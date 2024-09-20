import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        bootstrap: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
];
