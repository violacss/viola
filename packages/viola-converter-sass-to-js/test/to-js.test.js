import { types } from 'node-sass'
import toJs from '../'

describe('toJs', () => {
  test('should convert the given SASS Number to JS number', () => {
    const value = new types.Number(42)
    const got = toJs(value)
    expect(got).toBe(value.getValue())
  })

  test('should convert the given SASS Number with unit to JS Object', () => {
    const value = new types.Number(42, 'rem')
    const got = toJs(value)
    expect(got).toStrictEqual({ value: 42, unit: 'rem' })
  })

  test.each([
    [new types.String('dummy'), 'dummy'],
    [new types.String('"dummy string"'), 'dummy string'],
  ])('should convert SASS String%p to JS string %p', (value, expected) => {
    const got = toJs(value)
    expect(got).toBe(expected)
  })

  test.each([[types.Boolean.TRUE, true], [types.Boolean.FALSE, false]])(
    'should convert SASS Boolean %p to JS %p',
    (value, expected) => {
      const got = toJs(value)
      expect(got).toBe(expected)
    }
  )

  test.each([
    [new types.Color(10, 20, 30), { red: 10, green: 20, blue: 30, alpha: 1 }],
    [
      new types.Color(10, 20, 30, 0.2),
      { red: 10, green: 20, blue: 30, alpha: 0.2 },
    ],
  ])('should convert SASS Color%P to JS Object %p', (value, expected) => {
    const got = toJs(value)
    expect(got).toStrictEqual(expected)
  })

  test('should convert SASS NULL to null', () => {
    const got = toJs(types.Null.NULL)
    expect(got).toBeNull()
  })

  test.each([
    [
      [1, 2, 3].reduce((list, v, i) => {
        list.setValue(i, new types.Number(v))
        return list
      }, new types.List(3)),
      [1, 2, 3],
    ],
  ])('should convert SASS List%p to JS %p', (value, expected) => {
    const got = toJs(value)
    expect(got).toStrictEqual(expected)
  })

  test('should convert complex SASS List to JS Array', () => {
    const expected = [1, ['a', 'b'], { red: 0, green: 0, blue: 0, alpha: 1 }]
    let list = new types.List(3)
    let innerList = new types.List(2)

    list.setValue(0, new types.Number(1))
    list.setValue(1, new types.List(2))
    innerList.setValue(0, new types.String('a'))
    innerList.setValue(1, new types.String('b'))
    list.setValue(1, innerList)
    list.setValue(2, new types.Color(0, 0, 0, 1))

    const got = toJs(list)
    expect(got).toStrictEqual(expected)
  })

  test('should convert SASS Map to JS object', () => {
    const expected = { name: 'name', age: '3' }
    const map = Object.keys(expected).reduce((map, v, i) => {
      map.setKey(i, new types.String(v))
      map.setValue(i, new types.String(expected[v]))
      return map
    }, new types.Map(2))
    const got = toJs(map)
    expect(got).toStrictEqual(expected)
  })

  test('should convert complex SASS Map to JS object', () => {
    const expected = {
      name: 'name',
      age: 3,
      hair: { color: 'red' },
      lang: ['en', 'fr'],
    }
    const map = new types.Map(4)

    map.setKey(0, new types.String('name'))
    map.setValue(0, new types.String('name'))

    map.setKey(1, new types.String('age'))
    map.setValue(1, new types.Number(3))

    let hair = new types.Map(1)
    hair.setKey(0, new types.String('color'))
    hair.setValue(0, new types.String('red'))
    map.setKey(2, new types.String('hair'))
    map.setValue(2, hair)

    let lang = new types.List(2)
    lang.setValue(0, new types.String('en'))
    lang.setValue(1, new types.String('fr'))
    map.setKey(3, new types.String('lang'))
    map.setValue(3, lang)

    const got = toJs(map)
    expect(got).toStrictEqual(expected)
  })
})
