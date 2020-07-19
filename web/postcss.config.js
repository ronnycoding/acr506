module.exports = ({ file, options, env }) => ({
  // syntax: "postcss-scss",
  // parser: "postcss-scss",
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
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
