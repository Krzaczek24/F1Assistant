import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { LeaderboardManager } from '../../tools/leaderboard-manager'

const SECOND = 1000
const REFRESH_RATE = 3 * SECOND

@Component({
    selector: 'app-leader-board',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit, OnDestroy {
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
    private leaderboardManager?: LeaderboardManager

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

        forkJoin([
            this.driverService.getDrivers(sessionKey), 
            this.positionService.getPositions(sessionKey)
        ]).subscribe(([drivers, positions]) => {            
            const groupedChanges = this.groupAndSortPositions(positions)
            const initialDriverList = groupedChanges.shift()!.map(change => drivers.find(driver => driver.driverNumber === change.driverNumber)!)
            this.leaderboardManager = new LeaderboardManager(initialDriverList)
            groupedChanges.forEach(changes => this.leaderboardManager!.applyChanges(changes))
            this.leaderboard = this.leaderboardManager!.getLeaderboard()
            
            this.loading = false
            clearTimeout(this.ping)
            this.ping = setTimeout(() => this.loadNewChanges(), REFRESH_RATE)
        })
    }

    private loadNewChanges() {
        const sessionKey = this.form.get('sessionKey')!.value!
        
        this.positionService.getPositionsNewChanges(sessionKey).subscribe(positions => {
            if (positions?.length) {
                const groupedChanges = this.groupAndSortPositions(positions)
                groupedChanges.forEach(changes => this.leaderboardManager!.applyChanges(changes))
                this.leaderboard = this.leaderboardManager!.getLeaderboard()
            }
            
            clearTimeout(this.ping)
            this.ping = setTimeout(() => this.loadNewChanges(), REFRESH_RATE)
        })
    }

    private groupAndSortPositions(positions: Position[]): Position[][] {
        return groupBy(positions, position => position.date)
            .sort((a, b) => a.key.getTime() - b.key.getTime())
            .map(x => x.items)
    }

    public getYearsRange(): Number[] {
        return generateRange(BEGINING_YEAR, new Date().getFullYear())
    }
}
