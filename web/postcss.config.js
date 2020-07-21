module.exports = ({ file, options, env }) => ({
  // syntax: "postcss-scss",
  // parser: "postcss-scss",
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...{
      ...(env === "production"
        ? {
            "@fullhuman/postcss-purgecss": {
              content: ["./components/**/*.js", "./pages/**/*.js"],
              defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
            },
          }
        : {}),
    },
    "postcss-import": {},
    cssnano: env === "production" ? {} : false,
    "postcss-preset-env": {
      stage: 0,
      features: {
        "color-mod-function": { unresolved: "warn" },
        "nesting-rules": true,
      },
    },
  },
});
