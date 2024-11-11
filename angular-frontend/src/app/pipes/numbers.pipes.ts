import { Pipe, PipeTransform } from "@angular/core"
import { DIGIT_EMOJIS } from "../constants/dictionaries/digits"

@Pipe({
    name: 'numberToEmoji',
    standalone: true,
})
export class NumberToEmojiPipe implements PipeTransform {
    transform(value: number): string {
        const strValue = Array.from(value.toString())
        const emojis = strValue.map(char => DIGIT_EMOJIS[Number(char) as keyof typeof DIGIT_EMOJIS]).join('')
        return emojis
    }
}