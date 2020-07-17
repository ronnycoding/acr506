module.exports = {
  plugins: {
    "postcss-nested": {},
    tailwindcss: {},
    autoprefixer: {},
    "postcss-import": {},
    cssnano: process.env.NODE_ENV === "production" ? {} : undefined,
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 0,
      features: {
        "custom-properties": false,
      },
    },
  },
};
