const pkg = require(`./packages/${process.env.PKG_NAME}/package.json`)

module.exports = function (api) {
  api.cache(() => process.env.NODE_ENV);
  const presets = [
    ["@babel/preset-env",
      {
        targets: {
          node: true
        }
      }]
  ];

  const plugins = [
    "@babel/plugin-proposal-object-rest-spread",
    ["add-header-comment", {
      header: [`${pkg.name} v${pkg.version} | ${pkg.repository} | ${pkg.license} License\nAuthor: ${pkg.author.name} | ${pkg.author.url}`]
    }]
  ];

  return {
    sourceType: "unambiguous",
    presets,
    plugins,
  }
};
