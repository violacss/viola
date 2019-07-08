import { types } from 'node-sass'
import toSass from '../'

describe('toSass', () => {
  test('should convert the given number to SASS number', () => {
    const value = 42
    const got = toSass(value)
    expect(got.getValue()).toBe(value)
  })

  test('should convert the given number and unit to SASS number', () => {
    const value = 42
    const unit = 'vh'
    const got = toSass(value, unit)
    expect(got.getValue()).toBe(value)
    expect(got.getUnit()).toBe(unit)
  })

  test.each([
    ['dummy', 'dummy'],
    ['dummy string', '"dummy string"'],
    ['another dummy string', '"another dummy string"'],
  ])('should convert %p string to SASS string', (value, expected) => {
    const got = toSass(value)
    expect(got.getValue()).toBe(expected)
  })

  test.each([[true, types.Boolean.TRUE], [false, types.Boolean.FALSE]])(
    'should convert [%p] to SASS boolean',
    (value, expected) => {
      const got = toSass(value)
      expect(got).toBe(expected)
    }
  )

  test.each([
    [[1, 2, 3], [1, 2, 3]],
    [['a', 'b', 'c d'], ['a', 'b', '"c d"']],
    [[1, true], [1, true]],
  ])('should convert %p to SASS List', (array, expected) => {
    const got = toSass(array)
    expect(got.getLength()).toBe(array.length)

    let items = [...Array(got.getLength()).keys()].map(i =>
      got.getValue(i).getValue()
    )

    expect(items).toEqual(expect.arrayContaining(expected))
  })

  test.each([[null, types.Null.NULL], [undefined, types.Null.NULL]])(
    'should convert %p to SASS NULL type',
    (value, expected) => {
      const got = toSass(value)
      expect(got).toBe(expected)
    }
  )

  test.each([
    [{}, new types.Map(0)],
    [{ name: 'name' }, new types.Map(1)],
    [{ name: 'name', age: 3 }, new types.Map(2)],
    [{ name: 'name', age: 3, items: [1, 'a', false] }, new types.Map(3)],
    [
      { name: 'name', age: 3, hair: { color: 'brown', bald: false } },
      new types.Map(3),
    ],
  ])('should convert %p to SASS Map', (value, expected) => {
    const got = toSass(value)
    expect(got.getLength()).toEqual(expected.getLength())

    let obj = {}
    ;[...Array(got.getLength())].forEach((_, i) => {
      const key = got.getKey(i).getValue()
      if (got.getValue(i).getKey) {
        obj[key] = {}
        for (let j = 0; j < got.getValue(i).getLength(); j++) {
          obj[key][
            got
              .getValue(i)
              .getKey(j)
              .getValue()
          ] = got
            .getValue(i)
            .getValue(j)
            .getValue()
        }
      } else if (got.getValue(i).getSeparator) {
        obj[key] = []
        for (let j = 0; j < got.getValue(i).getLength(); j++) {
          obj[key].push(
            got
              .getValue(i)
              .getValue(j)
              .getValue()
          )
        }
      } else {
        obj[key] = got.getValue(i).getValue()
      }
    })

    expect(obj).toStrictEqual(value)
  })

  test('should convert special JS object {value:..., unit:...} to SASS Number', () => {
    const value = { value: 42, unit: 'rem' }
    const got = toSass(value)

    expect(got.getValue()).toBe(42)
    expect(got.getUnit()).toBe('rem')
  })

  test('should convert special JS object {red:..., green:..., blue:..., alpha:...} to SASS Color', () => {
    const value = { red: 100, green: 150, blue: 200, alpha: 0.7 }
    const got = toSass(value)

    expect(got.constructor.name).toBe('SassColor')
    expect(got.getR()).toBe(100)
    expect(got.getG()).toBe(150)
    expect(got.getB()).toBe(200)
    expect(got.getA()).toBe(0.7)
  })
})
