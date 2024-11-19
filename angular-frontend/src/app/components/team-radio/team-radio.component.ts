import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core'
import { RadioMessageComponent } from "../radio-message/radio-message.component";
import { RadioMessage } from '../../models/radio-message.model'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { generateRange } from '../../tools/array.tools'
import { MeetingService } from '../../services/meeting.service'
import { CommonModule } from '@angular/common'
import { Meeting } from '../../clients/open-f1/models/meeting/meeting.model'
import { SessionService } from '../../services/session.service'
import { Session } from '../../clients/open-f1/models/session/session.model'
import { TeamRadioService } from '../../services/team-radio.service'
import { DriverService } from '../../services/driver.service'
import { Driver } from '../../clients/open-f1/models/driver/driver.model'
import { CountryCodeToShortCodePipe, CountryCodeToNamePipe } from "../../pipes/country.pipes";
import { NumberToEmojiPipe } from "../../pipes/numbers.pipes";
import { BEGINING_YEAR } from '../../constants/values/beginning-year'

const SECOND = 1000
const REFRESH_RATE = 3 * SECOND

@Component({
    selector: 'app-team-radio',
    standalone: true,
    imports: [CommonModule, RadioMessageComponent, ReactiveFormsModule, CountryCodeToShortCodePipe, NumberToEmojiPipe, CountryCodeToNamePipe],
    templateUrl: './team-radio.component.html',
    styleUrl: './team-radio.component.css'
})
export class TeamRadioComponent implements OnInit, OnDestroy {
    public loading: boolean = true
    public autoplay: boolean = true
    public requestPlayEmitter = new EventEmitter<string>()

    public form = new FormGroup({
        year: new FormControl(new Date().getFullYear()),
        meetingKey: new FormControl<number>(0),
        sessionKey: new FormControl<number>(0),
        driverNumber: new FormControl<number>(0),
    })

    public meetings?: Meeting[]
    public sessions?: Session[]
    public drivers?: Driver[]
    public radioMessages?: RadioMessage[]
    public selectedDriver?: Driver

    private ping?: NodeJS.Timeout;

    constructor(
        private meetingService: MeetingService,
        private sessionService: SessionService,
        private driverService: DriverService,
        private teamRadioService: TeamRadioService
    ) {

    }

    ngOnInit(): void {
        this.onYearChanged()
    }

    ngOnDestroy(): void {
        if (this.ping) {
            clearTimeout(this.ping)
        }
    }

    public onYearChanged() {
        this.loading = true
        const year = this.form.get('year')!.value!

        this.meetingService.getMeetings(year).subscribe(meetings => {
            this.meetings = meetings
            const meetingKey = meetings.at(-1)!.meetingKey
            this.form.get('meetingKey')!.setValue(meetingKey)

            this.onMeetingChanged()
        })
    }

    public onMeetingChanged() {
        this.loading = true
        const meetingKey = this.form.get('meetingKey')!.value!

        this.sessionService.getSessions(meetingKey).subscribe(sessions => {
            this.sessions = sessions
            const sessionKey = sessions.at(-1)!.sessionKey
            this.form.get('sessionKey')!.setValue(sessionKey)

            this.onSessionChanged()
        })
    }

    public onSessionChanged() {
        this.loading = true
        const sessionKey = this.form.get('sessionKey')!.value!

        this.driverService.getDrivers(sessionKey).subscribe(drivers => {
            this.drivers = drivers
            const firstDriverNumber = drivers.at(0)!.driverNumber
            this.form.get('driverNumber')!.setValue(firstDriverNumber)

            this.onDriverChanged()
        })
    }

    public onDriverChanged() {
        this.loading = true
        const sessionKey = this.form.get('sessionKey')!.value!
        const driverNumber = this.form.get('driverNumber')!.value!

        this.selectedDriver = this.drivers!.find(driver => driver.driverNumber == driverNumber)

        this.teamRadioService.getTeamRadio(sessionKey, driverNumber).subscribe(radioMessages => {
            if (radioMessages.length) {
                this.radioMessages = radioMessages.sort().map(teamRadio => new RadioMessage(teamRadio, true))
            }
            
            this.loading = false

            clearTimeout(this.ping)
            this.ping = setTimeout(() => this.loadNewMessages(), REFRESH_RATE)
        })
    }

    private loadNewMessages() {
        const sessionKey = this.form.get('sessionKey')!.value!
        const driverNumber = this.form.get('driverNumber')!.value!
        
        this.teamRadioService.getTeamRadioNewMessages(sessionKey, driverNumber).subscribe(radioMessages => {
            if (radioMessages?.length) {
                const messages = radioMessages.sort().map(teamRadio => new RadioMessage(teamRadio, false))
                const anyPlaying = this.radioMessages!.some(message => message.isPlaying)
                this.radioMessages!.push(...messages)
                if (this.autoplay && !anyPlaying) {
                    const firstNewMessage = messages.at(0)
                    setTimeout(() => this.requestPlayEmitter.emit(firstNewMessage!.guid), 1000)
                }
            }
            
            clearTimeout(this.ping)
            this.ping = setTimeout(() => this.loadNewMessages(), REFRESH_RATE)
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

    public getYearsRange(): Number[] {
        return generateRange(BEGINING_YEAR, new Date().getFullYear())
    }
}
