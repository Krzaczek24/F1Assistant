import { Injectable } from "@angular/core"
import { OpenF1Client } from "../clients/open-f1/open-f1.client"
import { Position } from "../clients/open-f1/models/position/position.model"
import { Observable, of, tap } from "rxjs"

@Injectable({ providedIn: 'root' })
export class PositionService {
    private cache: { [sessionKey: string] : Position[]; } = {}

    constructor(private client: OpenF1Client) {
        
    }

    public getPositions(sessionKey: number): Observable<Position[]> {
        if (this.cache[sessionKey] != null) {
            return of(this.cache[sessionKey])
        }

        return this.client.getPositions({ sessionKey })
            .pipe(tap(response => this.cache[sessionKey] = response))
    }

    public getPositionsNewChanges(sessionKey: number) {
        const last = this.cache[sessionKey]?.at(-1)?.date

        return this.client.getPositions({ sessionKey, dateGt: last })
            .pipe(tap(response => this.cache[sessionKey].push(...response)))
    }
}