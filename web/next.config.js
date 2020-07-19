const withCSS = require("@zeit/next-css");
const withSASS = require("@zeit/next-sass");
const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");
const client = require("./client");

const isProduction = process.env.NODE_ENV === "production";
const query = `
{
  "routes": *[_type == "route"] {
    ...,
    title,
    disallowRobot,
    includeInSitemap,
    page->{
      _id,
      title,
      _createdAt,
      _updatedAt
  }}
}
`;
const reduceRoutes = (obj, route) => {
  const { page = {}, slug = {}, title = "no title" } = route;
  const { _createdAt, _updatedAt } = page;
  const { includeInSitemap, disallowRobot } = route;
  const path = route["slug"]["current"] === "/" ? "/" : `/${route["slug"]["current"]}`;
  obj[path] = {
    query: {
      slug: slug.current,
    },
    title,
    includeInSitemap,
    disallowRobot,
    _createdAt,
    _updatedAt,
    page: "/LandingPage",
  };
  return obj;
};

module.exports = withPlugins([withCSS, withSASS, withFonts], {
  target: "serverless",
  cssModules: true,
  cssLoaderOptions: {
    url: false,
    importLoaders: 1,
    localIdentName: isProduction ? "[hash:base64:5]" : "[name]__[local]___[hash:base64:5]",
  },
  exportPathMap: function () {
    return client.fetch(query).then((res) => {
      const { routes = [] } = res;
      const nextRoutes = {
        // Routes imported from sanity
        ...routes
          .filter(({ slug }) => {
            return slug.current;
          })
          .reduce(reduceRoutes, {}),
        "/custom-page": { page: "/CustomPage" },
      };
      return nextRoutes;
    });
  },
});
