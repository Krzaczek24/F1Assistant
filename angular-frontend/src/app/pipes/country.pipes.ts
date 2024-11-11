import { Pipe, PipeTransform } from '@angular/core'
import { COUNTRY_SHORTCODES } from '../constants/dictionaries/country.short-codes'
import { COUNTRY_NAMES } from '../constants/dictionaries/country.names'

@Pipe({
    name: 'countryName',
    standalone: true,
})
export class CountryCodeToNamePipe implements PipeTransform {
    transform(value: string): string | undefined {
        return COUNTRY_NAMES[value as keyof typeof COUNTRY_NAMES]
    }
}

@Pipe({
    name: 'countryShortCode',
    standalone: true,
})
export class CountryCodeToShortCodePipe implements PipeTransform {
    transform(value: string): string | undefined {
        return COUNTRY_SHORTCODES[value as keyof typeof COUNTRY_SHORTCODES]
    }
}