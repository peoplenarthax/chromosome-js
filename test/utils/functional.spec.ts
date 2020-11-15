import { allPass, complement, either, isNil, isNotNil, pick } from "../../src/utils/functional"

describe("isNil", () => {
  test("returns true if value is null or undefined", () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  test("returns false otherwise", () => {
    expect(isNil(0)).toBe(false)
    expect(isNil("")).toBe(false)
    expect(isNil("test")).toBe(false)
    expect(isNil(42)).toBe(false)
    expect(isNil([])).toBe(false)
    expect(isNil({})).toBe(false)
    expect(isNil([1, 2])).toBe(false)
    expect(isNil({ a: 1, b: 2 })).toBe(false)
  })
})

describe("isNotNil", () => {
  test("returns false if value is null or undefined", () => {
    expect(isNotNil(null)).toBe(false)
    expect(isNotNil(undefined)).toBe(false)
  })

  test("returns true otherwise", () => {
    expect(isNotNil(0)).toBe(true)
    expect(isNotNil("")).toBe(true)
    expect(isNotNil("test")).toBe(true)
    expect(isNotNil(42)).toBe(true)
    expect(isNotNil([])).toBe(true)
    expect(isNotNil({})).toBe(true)
    expect(isNotNil([1, 2])).toBe(true)
    expect(isNotNil({ a: 1, b: 2 })).toBe(true)
  })
})

describe("pick", () => {
  const object = {
    a: 1,
    b: 2,
    c: 3,
    z: 4,
  }

  test("returns an object with the picked values", () => {
    expect(pick(["a", "b", "c"])(object)).toEqual({ a: 1, b: 2, c: 3 })
  })

  test("returns an object with the existing keys if we send some keys that do no exist", () => {
    // In typescript there would be an error in object since we try to access non existing properties
    expect(pick(["x", "y", "z"])(object as any)).toEqual({ z: 4 })
  })

  test("returns an empty object if we try to pick an empty object", () => {
    // In typescript there would be an error in object since we try to access non existing properties
    expect(pick(["a", "b", "c"])({} as any)).toEqual({})
  })
})

describe("either", () => {
  const either3or5 = either(
    (value: number) => value === 3,
    (value: number) => value === 5
  )

  test("returns the result of the first function if it is a truthy value", () => {
    expect(either3or5(3)).toBe(true)
    expect(
      either(
        (value: number) => value * value,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      )(7)
    ).toBe(49)
  })

  test("returns the result of the second function if it is a truthy value", () => {
    expect(either3or5(5)).toBe(true)
    expect(
      either(
        (value: number) => value > 8,
        (value: number) => value - 2
      )(7)
    ).toBe(5)
  })

  test("returns false if neither condition is truthy", () => {
    expect(either3or5(8)).toBe(false)
  })
})

describe("allPass", () => {
  test("returns true if all the functions return a truthy value", () => {
    expect(allPass([(b: boolean) => b, () => true], true)).toBe(true)

    expect(
      allPass(
        [
          (value: number) => value % 5 === 0,
          (value: number) => value % 2 === 0,
        ],
        10
      )
    ).toBe(true)
  })

  test("returns false as soon as one of the conditions is false", () => {
    expect(allPass([(b: boolean) => b, () => true], false)).toBe(false)

    expect(
      allPass(
        [
          (value: number) => value % 5 === 0,
          (value: number) => value % 33 === 0,
        ],
        10
      )
    ).toBe(false)
  })

  test("returns true if the array of conditions is empty", () => {
    expect(allPass<(arg: unknown) => boolean>([], {})).toBe(true)
  })
})

describe("complement", () => {
  test("returns a function that negates the result", () => {
    const falsy = complement(() => true)

    expect(falsy()).toBe(false)
  })
})
