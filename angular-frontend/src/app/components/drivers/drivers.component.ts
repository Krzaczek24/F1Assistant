import { Component, OnInit } from '@angular/core'
import { OpenF1Client } from '../../clients/open-f1/open-f1.client'
import { Driver } from '../../clients/open-f1/models/driver/driver.model'
import { COUNTRY_DICTIONARY } from '../../constants/dictionaries/country.dictionary'

@Component({
    selector: 'app-drivers',
    standalone: true,
    imports: [],
    templateUrl: './drivers.component.html',
    styleUrl: './drivers.component.css'
})
export class DriversComponent implements OnInit {
    public initialized: boolean = false
    public drivers?: Driver[]

    public countryDict = COUNTRY_DICTIONARY

    constructor(private client: OpenF1Client) {

    }

    ngOnInit(): void {
        this.client.getDrivers({ sessionKey: 'latest' }).subscribe(drivers => {
            this.drivers = drivers
            this.initialized = true
        })
    }

    getCountry(code: string): string {
        let country = COUNTRY_DICTIONARY[code as keyof typeof COUNTRY_DICTIONARY]
        return country ?? code
    }
}
