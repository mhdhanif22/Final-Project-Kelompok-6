const js = require("@eslint/js");

module.exports = [
  {
    languageOptions: {
      globals: {
        require: true,
        __dirname: true,
        console: true,
        module: true,
      },
    },
  },
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      eqeqeq: "error",
      "no-console": "warn",
      semi: ["error", "always"],
      curly: "error",
    },
  },
];
