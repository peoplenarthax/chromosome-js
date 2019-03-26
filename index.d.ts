declare module "jest-mock-random" {
    type mockRandomForEach = (mock: number | string | number[] | string[]) => void

    export const mockRandomForEach : mockRandomForEach
}

declare module "testier" {
    type forAll = <T>(data: T[], testGenerator: (sample: T) => void) => void
    
    export const forAll : forAll
}
