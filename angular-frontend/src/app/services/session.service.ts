import { Injectable } from "@angular/core"
import { OpenF1Client } from "../clients/open-f1/open-f1.client"
import { Observable, of, map, tap } from "rxjs"
import { Session } from "../clients/open-f1/models/session/session.model"

@Injectable({ providedIn: 'root' })
export class SessionService {
    private cache: { [meetingKey: number] : Session[]; } = {}

    constructor(private client: OpenF1Client) {
        
    }

    public getSessions(meetingKey: number): Observable<Session[]> {
        if (this.cache[meetingKey] != null) {
            return of(this.cache[meetingKey])
        }

        return this.client.getSessions({ meetingKey })
            .pipe(tap(response => this.cache[meetingKey] = response))
    }

    public isActive(sessionKey: number): Observable<boolean> {
        return this.client.getSessions({ sessionKey })
            .pipe(map(sessions => {
                const session = sessions.at(0)
                return session?.dateEnd != null && session.dateEnd <= new Date()
            }))
    }
}