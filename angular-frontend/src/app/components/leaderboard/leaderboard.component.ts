import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Meeting } from '../../clients/open-f1/models/meeting/meeting.model'
import { Session } from '../../clients/open-f1/models/session/session.model'
import { LeaderboardRecord } from '../../models/leaderboard-record.model'
import { MeetingService } from '../../services/meeting.service'
import { SessionService } from '../../services/session.service'
import { BEGINING_YEAR } from '../../constants/values/beginning-year'
import { generateRange, groupBy } from '../../tools/array.tools'
import { PositionService } from '../../services/position.service'
import { forkJoin } from 'rxjs'
import { DriverService } from '../../services/driver.service'
import { Position } from '../../clients/open-f1/models/position/position.model'

const SECOND = 1000
const REFRESH_RATE = 3 * SECOND

@Component({
    selector: 'app-leader-board',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
    public loading: boolean = true

    public form = new FormGroup({
        year: new FormControl(new Date().getFullYear()),
        meetingKey: new FormControl<number>(0),
        sessionKey: new FormControl<number>(0),
    })

    public meetings?: Meeting[]
    public sessions?: Session[]
    public leaderboard?: LeaderboardRecord[]

    private ping?: NodeJS.Timeout;

    constructor(
        private meetingService: MeetingService,
        private sessionService: SessionService,
        private driverService: DriverService,
        private positionService: PositionService,
    ) {

    }

    ngOnInit(): void {
        this.onYearChanged()
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

        forkJoin([
            this.driverService.getDrivers(sessionKey), 
            this.positionService.getPositions(sessionKey)
        ]).subscribe(([drivers, positions]) => {
            const grouping = groupBy(positions, position => position.date)
            const sorted = grouping.sort((a, b) => a.key.getTime() - b.key.getTime()).map(x => x.items)
            this.leaderboard = sorted.shift()!.map(record => {
                const recordDriver = drivers.find(driver => driver.driverNumber === record.driverNumber)!
                return new LeaderboardRecord(recordDriver, record.position)
            })
            sorted.forEach(record => {
                record.forEach(change => {
                    const driver = this.leaderboard!.find(x => x.driver.driverNumber === change.driverNumber)!
                    driver.position = change.position
                })
            })
            
            this.leaderboard = this.leaderboard.sort((a, b) => a.position - b.position)
            
            this.loading = false

            clearTimeout(this.ping)
            this.ping = setTimeout(() => this.loadNewChanges(), REFRESH_RATE)
        })
    }

    private loadNewChanges() {
        const sessionKey = this.form.get('sessionKey')!.value!
        
        this.positionService.getPositionsNewChanges(sessionKey).subscribe(changes => {
            if (changes?.length) {
                changes.sort((a, b) => a.date.getTime() - b.date.getTime()).forEach(change => {
                    const driver = this.leaderboard!.find(x => x.driver.driverNumber === change.driverNumber)!
                    driver.position = change.position
                })

                this.leaderboard = this.leaderboard!.sort((a, b) => a.position - b.position)
            }
            
            clearTimeout(this.ping)
            this.ping = setTimeout(() => this.loadNewChanges(), REFRESH_RATE)
        })
    }

    public getYearsRange(): Number[] {
        return generateRange(BEGINING_YEAR, new Date().getFullYear())
    }
}
