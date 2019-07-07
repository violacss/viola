module.exports = function (api) {
  api.cache(() => process.env.NODE_ENV);
  const presets = [
    ['@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }]
  ];

  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-destructuring'
  ];

  if (process.env.NODE_ENV !== 'test' && process.env.PKG_NAME) {
    const pkg = require(`./packages/${process.env.PKG_NAME}/package.json`)
    const headerValue = ['add-header-comment', {
      header: [`${pkg.name} v${pkg.version} | ${pkg.repository} | ${pkg.license} License\nAuthor: ${pkg.author.name} | ${pkg.author.url}`]
    }]
    plugins.push(headerValue)
  }

  return {
    sourceType: 'unambiguous',
    presets,
    plugins,
  }
};
