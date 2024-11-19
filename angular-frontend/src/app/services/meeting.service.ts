import { Injectable } from "@angular/core"
import { OpenF1Client } from "../clients/open-f1/open-f1.client"
import { Meeting } from "../clients/open-f1/models/meeting/meeting.model"
import { Observable, of, tap } from "rxjs"

@Injectable({ providedIn: 'root' })
export class MeetingService {
    private cache: { [year: number] : Meeting[]; } = {}

    constructor(private client: OpenF1Client) {
        
    }

    public getMeetings(year: number): Observable<Meeting[]> {
        if (this.cache[year] != null) {
            return of(this.cache[year])
        }

        return this.client.getMeetings({ year })
            .pipe(tap(response => this.cache[year] = response))
    }
}