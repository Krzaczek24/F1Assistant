export class DateTimeParser {
    private static numberToString(number: number): string {
        return number.toString().padStart(2, '0')
    }
    
    public static formatDate(date: Date): string {
        return date.getFullYear() + 
            '-' + this.numberToString(date.getMonth() + 1) + 
            '-' + this.numberToString(date.getDate())
    }

    public static formatTime(date: Date): string {
        return this.numberToString(date.getHours()) + 
            ':' + this.numberToString(date.getMinutes()) + 
            ':' + this.numberToString(date.getSeconds()) +
            '.' + this.numberToString(date.getMilliseconds())
    }

    public static formatDateTime(date: Date): string {
        return this.formatDate(date) + ' ' + this.formatTime(date).padEnd(12, '0')
    }

    public static formatIsoDateTime(date: Date): string {
        return date.toISOString()
    }
    
    public static parseDate(date: string): Date {
        return new Date(date)
    }
}