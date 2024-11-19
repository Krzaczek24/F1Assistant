import { Injectable } from "@angular/core"
import { OpenF1Client } from "../clients/open-f1/open-f1.client"
import { Observable, of, tap } from "rxjs"
import { TeamRadio } from "../clients/open-f1/models/team-radio/team-radio.model"

@Injectable({ providedIn: 'root' })
export class TeamRadioService {
    private cache: { [key: string] : TeamRadio[]; } = {}

    constructor(private client: OpenF1Client) {
        
    }

    public getTeamRadio(sessionKey: number, driverNumber: number): Observable<TeamRadio[]> {
        const key = this.buildKey(sessionKey, driverNumber)

        if (this.cache[key] != null) {
            return of(this.cache[key])
        }

        return this.client.getTeamRadio({ sessionKey, driverNumber })
            .pipe(tap(response => this.cache[key] = response))
    }

    public getTeamRadioNewMessages(sessionKey: number, driverNumber: number): Observable<TeamRadio[]> {
        const key = this.buildKey(sessionKey, driverNumber)
        const last = this.cache[key]?.at(-1)?.date

        return this.client.getTeamRadio({ sessionKey, driverNumber, dateGt: last })
            .pipe(tap(response => this.cache[key].push(...response)))
    }

    private buildKey(sessionKey: number, driverNumber: number) {
        return `${sessionKey}_${driverNumber}`
    }
}