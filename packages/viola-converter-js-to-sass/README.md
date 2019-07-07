# @violacss/converter-js-to-sass

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
const result = toSass({name: 'Mike', age: 42}) // -> SassMap: (name: 'Mike', age: 42)
```
