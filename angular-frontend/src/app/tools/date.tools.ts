export function shiftDate(date: Date, shift: number) {
    return new Date(date.getTime() + shift)
}

export function dateFromNow(shift: number) {
    return shiftDate(new Date(), shift)
}