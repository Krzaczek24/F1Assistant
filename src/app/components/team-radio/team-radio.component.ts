import { Component } from '@angular/core'
import { OpenF1Client } from '../../clients/open-f1/open-f1.client'
import { TeamRadio } from '../../clients/open-f1/models/team-radio/team-radio.model'
import { DateTimeParser } from '../../clients/open-f1/tools/datetime-parser'

@Component({
    selector: 'app-team-radio',
    standalone: true,
    imports: [],
    templateUrl: './team-radio.component.html',
    styleUrl: './team-radio.component.css'
})
export class TeamRadioComponent {
    public initialized: boolean = false
    public radioMessages?: TeamRadio[]

    public parser = DateTimeParser

    constructor(private client: OpenF1Client) {

    }

    ngOnInit(): void {
        this.client.getTeamRadio({
            sessionKey: 'latest',
            driverNumber: 1
        }).subscribe(radioMessages => {
            this.radioMessages = radioMessages.sort()
            this.initialized = true
        })
    }
}
