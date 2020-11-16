
// TODO: Fix any type for array / object switch
export const mapObjIndexed= <T>(fn: (value: any, index: string | number | symbol, obj: T) => any, obj: T) : T => {
	if (Array.isArray(obj)) return obj.map(fn as any) as any
	
	return Object.keys(obj).reduce((acc: Partial<T>, key: string) => {
	  (acc as any)[key] = fn(obj[key as keyof T], key, obj);
	  return acc;
	}, {}) as T;
  };

  export const isNil = (variable: any): variable is null | undefined =>
  variable === null || variable === undefined

export const isNotNil = <T>(variable: T | undefined | null): variable is T =>
  !isNil(variable)

export const isOfTypeName = <T extends { __typename: string }>(
  obj: any,
  typename: T["__typename"]
): obj is T => obj.__typename === typename

export const pick = <T>(properties: Array<keyof T>) => (obj: T) =>
  properties.reduce(
    (pickedObj, property) =>
      obj[property] ? { ...pickedObj, [property]: obj[property] } : pickedObj,
    {}
  ) as Pick<T, Exclude<keyof T, Exclude<keyof T, keyof T>>>

export const getMidIndex = (array: ArrayLike<unknown>) =>
  Math.round(array.length / 2) - 1

export const allPass = <
  F extends (...args: any[]) => any = (...args: any[]) => any
>(
  conditions: F[],
  ...args: Parameters<F>
) => {
  const fail = conditions.find((condition) => !condition(...args))

  return !fail
}

export const either = <T, R1, R2>(
  functionF: (input: T) => R1,
  functionG: (input: T) => R2
) => (obj: T): R1 | R2 => functionF(obj) || functionG(obj)

export const complement = <F extends (...args: any[]) => boolean>(
  predicate: F
) => (...argument: Parameters<F>) => !predicate(...argument)
