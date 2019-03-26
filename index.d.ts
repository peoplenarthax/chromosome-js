declare module "jest-mock-random" {
    type mockRandomForEach = (mock: number | string | number[] | string[]) => void
    type mockRandom = (mock: number | string | number[] | string[]) => void
    type resetMockRandom = () => void

    export const mockRandom : mockRandom
    export const resetMockRandom : resetMockRandom
    export const mockRandomForEach : mockRandomForEach
}

declare module "testier" {
    type forAll = <T>(data: T[], testGenerator: (sample: T) => void) => void

    export const forAll : forAll
}
