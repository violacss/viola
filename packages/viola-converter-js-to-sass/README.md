# @violacss/converter-js-to-sass

[![Travis][travis]](https://travis-ci.org/violacss/viola)
[![npm][npm]](https://www.npmjs.com/package/@violacss/converter-js-to-sass)
[![Download][download]](https://www.npmjs.com/package/@violacss/converter-js-to-sass)
[![coverage][codecov]](https://codecov.io/gh/violacss/viola/branch/master)
[![License][license]](https://github.com/violacss/viola/blob/master/LICENSE)

This is a helper to convert JavaScript data types to SASS data types

## installation

```bash
$ yarn add @violacss/converter-js-to-sass
```
or
```bash
$ npm i @violacss/converter-js-to-sass --save
```

## Usage

```javascript
const toSass = require('@violacss/converter-js-to-sass');
const result = toSass({name: 'Mike', age: 42}) // -> SassMap{}: (name: 'Mike', age: 42)
```

[travis]: https://img.shields.io/travis/violacss/viola/master.svg?logo=travis&style=flat-square
[npm]: https://img.shields.io/npm/v/@violacss/converter-js-to-sass.svg?logo=npm&style=flat-square
[download]: https://img.shields.io/npm/dt/@violacss/converter-js-to-sass.svg?logo=node.js&style=flat-square
[codecov]: https://img.shields.io/codecov/c/gh/violacss/viola/master.svg?logo=codecov&style=flat-square
[license]: https://img.shields.io/github/license/violacss/viola.svg?style=flat-square
