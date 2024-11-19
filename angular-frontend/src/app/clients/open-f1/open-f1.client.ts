import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, map, Observable, retry, throwError } from "rxjs"
import { DateTimeParser } from "./tools/datetime-parser"
import { environment } from "../../../environments/environment"
// === DRIVER ===
import { Driver } from "./models/driver/driver.model"
import { DriverFilters } from "./models/driver/driver.filters"
import { DriverProperties } from "./models/driver/driver.properties"
// === MEETING ===
import { Meeting } from "./models/meeting/meeting.model"
import { MeetingFilters } from "./models/meeting/meeting.filters"
import { MeetingProperties } from "./models/meeting/meeting.properties"
// === POSITION ===
import { Position } from "./models/position/position.model"
import { PositionFilters } from "./models/position/position.filters"
import { PositionProperties } from "./models/position/position.properties"
// === TEAM RADIO ===
import { TeamRadio } from "./models/team-radio/team-radio.model"
import { TeamRadioFilters } from "./models/team-radio/team-radio.filters"
import { TeamRadioProperties } from "./models/team-radio/team-radio.properties"
// === SESSION ===
import { Session } from "./models/session/session.model"
import { SessionFilters } from "./models/session/session.filters"
import { SessionProperties } from "./models/session/session.properties"

type HttpMethod = 'get' | 'post' | 'put' | 'patch'
type ParamOperator = '=' | '>' | '<' | '>=' | '<='

@Injectable({ providedIn: 'root' })
export class OpenF1Client {
    constructor(private client: HttpClient) {
        
    }

    public getDrivers(filters?: DriverFilters): Observable<Driver[]> {
        let url = '/drivers'
        if (filters) {
            url = appendUrlParam(url, DriverProperties.DRIVER_NUMBER, filters.driverNumber)
            url = appendUrlParam(url, DriverProperties.MEETING_KEY, filters.meetingKey)
            url = appendUrlParam(url, DriverProperties.SESSION_KEY, filters.sessionKey)
            url = appendUrlParam(url, DriverProperties.NAME_ACRONYM, filters.nameAcronym)
            url = appendUrlParam(url, DriverProperties.TEAM_NAME, filters.teamName)
        }
        return this.makeRequest<Driver>('get', url, Driver.fromJS)
    }

    public getPositions(filters?: PositionFilters): Observable<Position[]> {
        let url = '/position'
        if (filters) {
            url = appendUrlParam(url, PositionProperties.DATE, filters.date, '=')
            url = appendUrlParam(url, PositionProperties.DATE, filters.dateGt, '>')
            url = appendUrlParam(url, PositionProperties.DATE, filters.dateGte, '>=')
            url = appendUrlParam(url, PositionProperties.DATE, filters.dateLt, '<')
            url = appendUrlParam(url, PositionProperties.DATE, filters.dateLte, '<=')
            url = appendUrlParam(url, PositionProperties.DRIVER_NUMBER, filters.driverNumber)
            url = appendUrlParam(url, PositionProperties.MEETING_KEY, filters.meetingKey)
            url = appendUrlParam(url, PositionProperties.POSITION, filters.position)
            url = appendUrlParam(url, PositionProperties.SESSION_KEY, filters.sessionKey)
        }
        return this.makeRequest<Position>('get', url, Position.fromJS)
    }

    public getTeamRadio(filters?: TeamRadioFilters): Observable<TeamRadio[]> {
        let url = '/team_radio'
        if (filters) {
            url = appendUrlParam(url, TeamRadioProperties.DATE, filters.date, '=')
            url = appendUrlParam(url, TeamRadioProperties.DATE, filters.dateGt, '>')
            url = appendUrlParam(url, TeamRadioProperties.DATE, filters.dateGte, '>=')
            url = appendUrlParam(url, TeamRadioProperties.DATE, filters.dateLt, '<')
            url = appendUrlParam(url, TeamRadioProperties.DATE, filters.dateLte, '<=')
            url = appendUrlParam(url, TeamRadioProperties.DRIVER_NUMBER, filters.driverNumber)
            url = appendUrlParam(url, TeamRadioProperties.MEETING_KEY, filters.meetingKey)
            url = appendUrlParam(url, TeamRadioProperties.SESSION_KEY, filters.sessionKey)
        }
        return this.makeRequest<TeamRadio>('get', url, TeamRadio.fromJS)
    }

    public getMeetings(filters?: MeetingFilters): Observable<Meeting[]> {
        let url = '/meetings'
        if (filters) {
            url = appendUrlParam(url, MeetingProperties.CIRCUIT_KEY, filters.circuitKey)
            url = appendUrlParam(url, MeetingProperties.CIRCUIT_SHORT_NAME, filters.circuitShortName)
            url = appendUrlParam(url, MeetingProperties.COUNTRY_CODE, filters.countryCode)
            url = appendUrlParam(url, MeetingProperties.COUNTRY_KEY, filters.countryKey)
            url = appendUrlParam(url, MeetingProperties.COUNTRY_NAME, filters.countryName)
            url = appendUrlParam(url, MeetingProperties.DATE_START, filters.dateStart, '=')
            url = appendUrlParam(url, MeetingProperties.DATE_START, filters.dateStartGt, '>')
            url = appendUrlParam(url, MeetingProperties.DATE_START, filters.dateStartGte, '>=')
            url = appendUrlParam(url, MeetingProperties.DATE_START, filters.dateStartLt, '<')
            url = appendUrlParam(url, MeetingProperties.DATE_START, filters.dateStartLte, '<=')
            url = appendUrlParam(url, MeetingProperties.GMT_OFFSET, filters.circuitShortName)
            url = appendUrlParam(url, MeetingProperties.CIRCUIT_SHORT_NAME, filters.circuitShortName)
            url = appendUrlParam(url, MeetingProperties.MEETING_KEY, filters.meetingKey)
            url = appendUrlParam(url, MeetingProperties.YEAR, filters.year, '=')
            url = appendUrlParam(url, MeetingProperties.YEAR, filters.yearGt, '>')
            url = appendUrlParam(url, MeetingProperties.YEAR, filters.yearGte, '>=')
            url = appendUrlParam(url, MeetingProperties.YEAR, filters.yearLt, '<')
            url = appendUrlParam(url, MeetingProperties.YEAR, filters.yearLte, '<=')
        }
        return this.makeRequest<Meeting>('get', url, Meeting.fromJS)
    }

    public getSessions(filters?: SessionFilters): Observable<Session[]> {
        let url = '/sessions'
        if (filters) {
            url = appendUrlParam(url, SessionProperties.CIRCUIT_KEY, filters.circuitKey)
            url = appendUrlParam(url, SessionProperties.CIRCUIT_SHORT_NAME, filters.circuitShortName)
            url = appendUrlParam(url, SessionProperties.COUNTRY_CODE, filters.countryCode)
            url = appendUrlParam(url, SessionProperties.COUNTRY_KEY, filters.countryKey)
            url = appendUrlParam(url, SessionProperties.COUNTRY_NAME, filters.countryName)
            url = appendUrlParam(url, SessionProperties.DATE_END, filters.dateEnd, '=')
            url = appendUrlParam(url, SessionProperties.DATE_END, filters.dateEndGt, '>')
            url = appendUrlParam(url, SessionProperties.DATE_END, filters.dateEndGte, '>=')
            url = appendUrlParam(url, SessionProperties.DATE_END, filters.dateEndLt, '<')
            url = appendUrlParam(url, SessionProperties.DATE_END, filters.dateEndLte, '<=')
            url = appendUrlParam(url, SessionProperties.DATE_START, filters.dateStart, '=')
            url = appendUrlParam(url, SessionProperties.DATE_START, filters.dateStartGt, '>')
            url = appendUrlParam(url, SessionProperties.DATE_START, filters.dateStartGte, '>=')
            url = appendUrlParam(url, SessionProperties.DATE_START, filters.dateStartLt, '<')
            url = appendUrlParam(url, SessionProperties.DATE_START, filters.dateStartLte, '<=')
            url = appendUrlParam(url, SessionProperties.GMT_OFFSET, filters.circuitShortName)
            url = appendUrlParam(url, SessionProperties.CIRCUIT_SHORT_NAME, filters.circuitShortName)
            url = appendUrlParam(url, SessionProperties.MEETING_KEY, filters.meetingKey)
            url = appendUrlParam(url, SessionProperties.YEAR, filters.year, '=')
            url = appendUrlParam(url, SessionProperties.YEAR, filters.yearGt, '>')
            url = appendUrlParam(url, SessionProperties.YEAR, filters.yearGte, '>=')
            url = appendUrlParam(url, SessionProperties.YEAR, filters.yearLt, '<')
            url = appendUrlParam(url, SessionProperties.YEAR, filters.yearLte, '<=')
        }
        return this.makeRequest<Session>('get', url, Session.fromJS)
    }

    private makeRequest<T>(method: HttpMethod, endpoint: string, parser: (response: any) => T): Observable<T[]> {
        return this.client.request(method, environment.apiUrl + endpoint)
            .pipe(map((response: any) => Array.isArray(response) ? response.map(parser) : []))
            .pipe(retry({ count: 10, delay: 500, resetOnSuccess: true }))
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