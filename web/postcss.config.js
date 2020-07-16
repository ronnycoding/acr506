module.exports = ({ file, options, env }) => ({
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
