import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, map, Observable, throwError } from "rxjs"
import { Driver } from "./models/driver/driver.model"
import { DriverProperties } from "./models/driver/driver.properties"
import { DateTimeParser } from "./tools/datetime-parser"
import { TeamRadio } from "./models/team-radio/team-radio.model"
import { TeamRadioFilters } from "./models/team-radio/team-radio.filters"
import { DriverFilters } from "./models/driver/driver.filters"
import { TeamRadioProperties } from "./models/team-radio/team-radio.properties"
import { environment } from "../../../environments/environment"

type HttpMethod = "get" | "post" | "put" | "patch"
type ParamOperator = "=" | ">" | "<" | ">=" | "<="

@Injectable({ providedIn: 'root' })
export class OpenF1Client {
    constructor(private client: HttpClient) {
        
    }

    public getDrivers(filters?: DriverFilters): Observable<Driver[]> {
        let url = "/drivers"
        if (filters) {
            url = appendUrlParam(url, DriverProperties.DRIVER_NUMBER, filters.driverNumber)
            url = appendUrlParam(url, DriverProperties.MEETING_KEY, filters.meetingKey)
            url = appendUrlParam(url, DriverProperties.SESSION_KEY, filters.sessionKey)
            url = appendUrlParam(url, DriverProperties.NAME_ACRONYM, filters.nameAcronym)
            url = appendUrlParam(url, DriverProperties.TEAM_NAME, filters.teamName)
        }
        return this.makeRequest<Driver>("get", url, Driver.fromJS)
    }

    public getTeamRadio(filters?: TeamRadioFilters): Observable<TeamRadio[]> {
        let url = '/team_radio'
        if (filters) {
            url = appendUrlParam(url, TeamRadioProperties.DATE, filters.dateGreaterThan, '>')
            url = appendUrlParam(url, TeamRadioProperties.DRIVER_NUMBER, filters.driverNumber)
            url = appendUrlParam(url, TeamRadioProperties.MEETING_KEY, filters.meetingKey)
            url = appendUrlParam(url, TeamRadioProperties.SESSION_KEY, filters.sessionKey)
        }
        return this.makeRequest<TeamRadio>("get", url, TeamRadio.fromJS)
    }

    private makeRequest<T>(method: HttpMethod, endpoint: string, parser: (response: any) => T): Observable<T[]> {
        return this.client.request(method, environment.apiUrl + endpoint)
            .pipe(map((response: any) => Array.isArray(response) ? response.map(parser) : []))
            .pipe(catchError((response: any) => throwException<T[]>(endpoint, response)))
    }
}

function appendUrlParam(url: string, paramName: string, parameterValue: number | string | boolean | Date | undefined, operator: ParamOperator = '='): string {
    if (parameterValue != null) {
        const concatenationChar = url.includes('?') ? '&' : '?'
        if (parameterValue instanceof Date) {
            parameterValue = DateTimeParser.formatDateTime(parameterValue)
        }
        url += concatenationChar + paramName + operator + parameterValue
    }
    return url
}

function throwException<T>(endpoint: string, response: string): Observable<T> {
    return throwError(() => new ApiException(`Unexpected api error occured while calling [${endpoint}]`, response))
}

export class ApiException extends Error {
    override message: string
    response: string

    constructor(message: string, response: string) {
        super()
        this.message = message
        this.response = response
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}