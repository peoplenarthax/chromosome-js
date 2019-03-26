export type BuilderInterface<T> = {
    // eslint-disable-next-line no-use-before-define
    [key in keyof T]: (arg: T[key]) => BuilderInterface<T>
} & {
    build(): T
}

export function createBuilder<T>(template?: T): BuilderInterface<T> {
    const _blueprint: any = template ? Object.assign({}, template) : {}
    const builder = new Proxy(
        {},
        {
            get(__, prop) {
                if (prop === "build") {
                    return () => _blueprint
                }
                return (x: any): any => {
                    _blueprint[prop] = x
                    return builder
                }
            }
        }
    )

    return builder as BuilderInterface<T>
}
