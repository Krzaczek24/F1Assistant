export function generateRange(from: number, to: number): Array<number> {
    return [...Array(to - from + 1).keys()].map(x => x + from)
}