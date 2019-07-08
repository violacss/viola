# @violacss/converter-sass-to-js

[![Travis][travis]](https://travis-ci.org/violacss/viola)
[![npm][npm]](https://www.npmjs.com/package/@violacss/converter-sass-to-js)
[![Download][download]](https://www.npmjs.com/package/@violacss/converter-sass-to-js)
[![coverage][codecov]](https://codecov.io/gh/violacss/viola/branch/master)
[![License][license]](https://github.com/violacss/viola/blob/master/LICENSE)

This is a helper to convert SASS data types to JavaScript data types

## Installation

```bash
$ yarn add @violacss/converter-sass-to-js
```
or
```bash
$ npm i @violacss/converter-sass-to-js --save
```

## Usage

```javascript
const sass = require('node-sass');

const toJs = require('@violacss/converter-sass-to-js');
const number = new sass.types.Number(42,'rem');
const result = toJs(number); // -> {value: 42, unit:'rem'}
```

[travis]: https://img.shields.io/travis/violacss/viola/master.svg?logo=travis&style=flat-square
[npm]: https://img.shields.io/npm/v/@violacss/converter-sass-to-js.svg?logo=npm&style=flat-square
[download]: https://img.shields.io/npm/dt/@violacss/converter-sass-to-js.svg?logo=node.js&style=flat-square
[codecov]: https://img.shields.io/codecov/c/gh/violacss/viola/master.svg?logo=codecov&style=flat-square
[license]: https://img.shields.io/github/license/violacss/viola.svg?style=flat-square
