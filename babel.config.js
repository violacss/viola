module.exports = function(api) {
  api.cache(() => process.env.NODE_ENV)
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ]

  let plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-destructuring',
  ]

  if (process.env.NODE_ENV !== 'test' && process.env.npm_package_name) {
    const pkgName =
      'viola-' +
      process.env.npm_package_name.substring(
        process.env.npm_package_name.indexOf('/') + 1
      )
    const pkg = require(`./packages/${pkgName}/package.json`)
    const headerValue = [
      'add-header-comment',
      {
        header: [
          `${pkg.name} v${pkg.version} | ${pkg.repository} | ${pkg.license} License\nAuthor: ${pkg.author.name} | ${pkg.author.url}`,
        ],
      },
    ]
    plugins.push(headerValue)
  }

  return {
    sourceType: 'unambiguous',
    presets,
    plugins,
  }
}
