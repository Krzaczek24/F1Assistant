export function generateRange(from: number, to: number): Array<number> {
    return [...Array(to - from + 1).keys()].map(x => x + from)
}

export type Grouping<TKey, TItem> = { key: TKey, items: TItem[] }[]

export function groupBy<TKey, TItem>(array: TItem[], keySelector: (item: TItem) => TKey) {

    return array.reduce((acc, cur) => {

        const key = keySelector(cur)
        
        const group = acc.find(x => {
            if (typeof key === 'object' && key instanceof Date
            && typeof x.key === 'object' && x.key instanceof Date
            ) {
                return x.key.getTime() === key.getTime()
            } else {
                return x.key === key
            }
        })

        if (group) {
            group.items.push(cur)
            return acc
        }

        acc.push({ key, items: [cur] })
        return acc

    }, [] as Grouping<TKey, TItem>)
}