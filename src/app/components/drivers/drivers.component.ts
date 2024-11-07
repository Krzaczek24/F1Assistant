import { Component, OnInit } from '@angular/core'
import { OpenF1Client } from '../../clients/open-f1/open-f1.client'
import { Driver } from '../../clients/open-f1/models/driver/driver.model'

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

    constructor(private client: OpenF1Client) {

    }

    ngOnInit(): void {
        this.client.getDrivers({ sessionKey: 'latest' }).subscribe(drivers => {
            this.drivers = drivers
            this.initialized = true
        })
    }
}
