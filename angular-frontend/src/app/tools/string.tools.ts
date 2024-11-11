export function insert(textBase: string, textToInsert: string, ...indexes: number[]): string {
    textBase = textBase.padEnd(24, '0')
    indexes.sort().forEach(i => textBase = textBase.substring(0, i) + textToInsert + textBase.substring(i))
    return textBase
}