import { DateTimeParser } from "../../tools/datetime-parser"
import { ISession} from "./session.interface"
import { SessionProperties } from "./session.properties"

export class Session implements ISession {
    private _circuitKey: number
    public get circuitKey() { return this._circuitKey }

    private _circuitShortName: string
    public get circuitShortName() { return this._circuitShortName }

    private _countryCode: string
    public get countryCode() { return this._countryCode }

    private _countryKey: number
    public get countryKey() { return this._countryKey }

    private _countryName: string
    public get countryName() { return this._countryName }

    private _dateEnd: Date
    public get dateEnd() { return this._dateEnd }

    private _dateStart: Date
    public get dateStart() { return this._dateStart }

    private _gmtOffset: number
    public get gmtOffset() { return this._gmtOffset }

    private _location: string
    public get location() { return this._location }

    private _meetingKey: number
    public get meetingKey() { return this._meetingKey }

    private _sessionKey: number
    public get sessionKey() { return this._sessionKey }
    
    private _sessionName: string
    public get sessionName() { return this._sessionName }

    private _sessionType: string
    public get sessionType() { return this._sessionType }

    private _year: number
    public get year() { return this._year }

    private constructor(data: ISession) {
        this._circuitKey = data.circuitKey
        this._circuitShortName = data.circuitShortName
        this._countryCode = data.countryCode
        this._countryKey = data.countryKey
        this._countryName = data.countryName
        this._dateEnd = data.dateEnd
        this._dateStart = data.dateStart
        this._gmtOffset = data.gmtOffset
        this._location = data.location
        this._meetingKey = data.meetingKey
        this._sessionKey = data.sessionKey
        this._sessionName = data.sessionName
        this._sessionType = data.sessionType
        this._year = data.year
    }

    public static fromJS(data: any): Session {
        return new Session({
            circuitKey: data[SessionProperties.CIRCUIT_KEY],
            circuitShortName: data[SessionProperties.CIRCUIT_SHORT_NAME],
            countryCode: data[SessionProperties.COUNTRY_CODE],
            countryKey: data[SessionProperties.COUNTRY_KEY],
            countryName: data[SessionProperties.COUNTRY_NAME],
            dateEnd: DateTimeParser.parseDate(data[SessionProperties.DATE_END]),
            dateStart: DateTimeParser.parseDate(data[SessionProperties.DATE_START]),
            gmtOffset: data[SessionProperties.GMT_OFFSET],
            location: data[SessionProperties.LOCATION],
            meetingKey: data[SessionProperties.MEETING_KEY],
            sessionKey: data[SessionProperties.SESSION_KEY],
            sessionName: data[SessionProperties.SESSION_NAME],
            sessionType: data[SessionProperties.SESSION_TYPE],
            year: data[SessionProperties.YEAR]
        })
    }
}