import {types as sassTypes} from 'node-sass';

export default toJs()

function toJs() {
  return function (sassValue) {
    return toJsValue(sassValue)
  }

  function toJsValue(sassValue) {
    switch (sassValue.constructor.name) {
      case 'SassNumber':
        return toNumber(sassValue)
      case 'SassString':
        return toString(sassValue)
      case 'SassColor':
        return toColor(sassValue)
      case 'SassBoolean':
        return toBoolean(sassValue)
      case 'SassList':
        return toArray(sassValue)
      case 'SassMap':
        return toObject(sassValue)
      case 'SassNull':
        return null
    }
  }

  function toNumber(value) {
    if (value.getUnit()) {
      return {value: value.getValue(), unit: value.getUnit()}
    }
    return value.getValue()
  }

  function toString(value) {
    return value.getValue()
      .replace(/^"/, '')
      .replace(/"$/, '')
  }

  function toColor(value) {
    return {
      red: value.getR(),
      green: value.getG(),
      blue: value.getB(),
      alpha: value.getA(),
    }
  }

  function toBoolean(value) {
    return value === sassTypes.Boolean.TRUE
  }

  function toArray(value) {
    return [...Array(value.getLength()).keys()]
      .map(i => toJsValue(value.getValue(i)))
  }

  function toObject(value) {
    return [...Array(value.getLength()).keys()]
      .reduce((obj, _, i) => {
        obj[value.getKey(i).getValue()] = toJsValue(value.getValue(i))
        return obj
      }, {})
  }

}
