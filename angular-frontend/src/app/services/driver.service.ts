import { Injectable } from "@angular/core"
import { OpenF1Client } from "../clients/open-f1/open-f1.client"
import { Driver } from "../clients/open-f1/models/driver/driver.model"
import { Observable, of, publishReplay, shareReplay, tap } from "rxjs"

@Injectable({ providedIn: 'root' })
export class DriverService {
    private cache: { [sessionKey: number] : Driver[]; } = {}

    constructor(private client: OpenF1Client) {
        
    }

    public getDrivers(sessionKey: number): Observable<Driver[]> {
        if (this.cache[sessionKey] != null) {
            return of(this.cache[sessionKey])
        }

        return this.client.getDrivers({ sessionKey })
            .pipe(tap(response => this.cache[sessionKey] = response))
    }
}