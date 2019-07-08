import { types as sassTypes } from 'node-sass'

export default toSass(sassTypes)

function toSass(t) {
  return function(jsValue, unit = '', commaSeparated = true) {
    return toSassValue(jsValue, unit, commaSeparated)
  }

  function toSassValue(jsValue, unit, commaSeparated = true) {
    switch (typeof jsValue) {
      case 'number':
        return toNumber(jsValue, unit)
      case 'string':
        return toString(jsValue)
      case 'boolean':
        return toBoolean(jsValue)
      case 'object':
        if (!jsValue) {
          return toNull()
        } else if (Array.isArray(jsValue)) {
          return toList(jsValue, commaSeparated)
        } else {
          return toMap(jsValue, commaSeparated)
        }
      case 'undefined':
        return toNull()
    }
  }

  function toNumber(value, unit) {
    return new t.Number(value, unit ? unit : '')
  }

  function toString(value) {
    if (value.includes(' ')) {
      return new t.String(`"${value}"`)
    }
    return new t.String(value)
  }

  function toBoolean(value) {
    return value ? t.Boolean.TRUE : t.Boolean.FALSE
  }

  function toList(value, commaSeparated) {
    let list = new t.List(value.length, commaSeparated)
    value.map((v, i) => list.setValue(i, toSassValue(v, '', commaSeparated)))
    return list
  }

  function toMap(value, commaSeparated) {
    if (isNumber(value)) {
      return toNumber(value.value, value.unit)
    }
    if (isColor(value)) {
      return toColor(value)
    }
    let map = new t.Map(Object.keys(value).length)
    Object.keys(value).map((k, i) => {
      map.setKey(i, toString(k))
      map.setValue(i, toSassValue(value[k], '', commaSeparated))
    })
    return map
  }

  function toColor(value) {
    return new t.Color(value.red, value.green, value.blue, value.alpha)
  }

  function toNull() {
    return t.Null.NULL
  }

  function isNumber(value) {
    return Object.keys(value).length === 2 && value.value && value.unit
  }

  function isColor(value) {
    return (
      Object.keys(value).length === 4 &&
      value.red &&
      value.green &&
      value.blue &&
      value.alpha
    )
  }
}
