import { Component, EventEmitter } from '@angular/core'
import { OpenF1Client } from '../../clients/open-f1/open-f1.client'
import { RadioMessageComponent } from "../radio-message/radio-message.component";
import { RadioMessage } from '../../models/radio-message.model'
import { TeamRadio } from '../../clients/open-f1/models/team-radio/team-radio.model'
import { TeamRadioProperties } from '../../clients/open-f1/models/team-radio/team-radio.properties'
import { DateTimeParser } from '../../clients/open-f1/tools/datetime-parser'

@Component({
    selector: 'app-team-radio',
    standalone: true,
    imports: [RadioMessageComponent],
    templateUrl: './team-radio.component.html',
    styleUrl: './team-radio.component.css'
})
export class TeamRadioComponent {
    public initialized: boolean = false
    public radioMessages?: RadioMessage[]
    public requestPlayEmitter = new EventEmitter<string>()

    constructor(private client: OpenF1Client) {

    }

    ngOnInit(): void {
        this.client.getTeamRadio({
            sessionKey: 'latest',
            driverNumber: 1
        }).subscribe(radioMessages => {
            this.radioMessages = radioMessages.sort().map(teamRadio => new RadioMessage(teamRadio, true))
            this.initialized = true
            setTimeout(() => this.loadNewMessages(), 2000)
        })
    }

    private loadNewMessages() {
        this.client.getTeamRadio({
            sessionKey: 'latest',
            driverNumber: 1,
            dateGreaterThan: this.radioMessages?.at(-1)?.date
        }).subscribe(radioMessages => {
            // vvv --- DO WYWALENIA --- vvv
            if (Math.random() < 0.55) {
                let obj = {} as any
                obj[TeamRadioProperties.DATE] = DateTimeParser.formatDateTime(new Date())
                obj[TeamRadioProperties.DRIVER_NUMBER] = 1
                obj[TeamRadioProperties.MEETING_KEY] = 0
                obj[TeamRadioProperties.RECORDING_URL] = this.radioMessages!.at(0)!.recordingUrl
                obj[TeamRadioProperties.SESSION_KEY] = 0
                radioMessages = [TeamRadio.fromJS(obj)]
            }
            // ^^^ --- DO WYWALENIA --- ^^^
            if (radioMessages.length > 0) {
                const messages = radioMessages.sort().map(teamRadio => new RadioMessage(teamRadio, false))
                const anyPlaying = this.radioMessages!.some(message => message.isPlaying)
                this.radioMessages!.push(...messages)
                console.log('==========================================')
                console.log('anyPlaying:', anyPlaying)
                if (!anyPlaying) {
                    const firstNewMessage = messages.at(0)
                    console.log('requestPlay:', firstNewMessage!.guid)
                    setTimeout(() => this.requestPlayEmitter.emit(firstNewMessage!.guid), 1000)
                }
            }
            
            setTimeout(() => this.loadNewMessages(), 2000)
        })
    }

    public playNextOf(radioMessage: RadioMessage) {
        const index = this.radioMessages?.indexOf(radioMessage)
        if (index != null) {
            const nextMessageGuid = this.radioMessages!.at(index + 1)?.guid
            if (nextMessageGuid) {
                this.requestPlayEmitter.emit(nextMessageGuid)
            }
        }
    }

    public markAllAsListened() {
        this.radioMessages?.forEach(message => message.setListened())
    }

    public playAll() {
        this.radioMessages?.forEach(message => message.setUnlistened())
        const firstMessage = this.radioMessages?.at(0)
        if (firstMessage) {
            this.requestPlayEmitter.emit(firstMessage.guid)
        }
    }
}
