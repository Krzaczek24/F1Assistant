import { Component, OnInit } from '@angular/core'
import { OpenF1Client } from '../../clients/open-f1.client'
import { Driver } from '../../models/driver.model'

@Component({
    selector: 'app-drivers',
    standalone: true,
    imports: [],
    templateUrl: './drivers.component.html',
    styleUrl: './drivers.component.css'
})
export class DriversComponent implements OnInit {
    public drivers?: Driver[]
    public initialized: boolean = false

    constructor(private client: OpenF1Client) {

    }

    ngOnInit(): void {
        this.client.getDrivers().subscribe(drivers => {
            this.drivers = drivers
            this.initialized = true
        })
    }
}
