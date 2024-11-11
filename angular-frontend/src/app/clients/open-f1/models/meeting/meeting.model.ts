import { DateTimeParser } from "../../tools/datetime-parser"
import { IMeeting } from "./meeting.interface"
import { MeetingProperties } from "./meeting.properties"

export class Meeting implements IMeeting {
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

    private _dateStart: Date
    public get dateStart() { return this._dateStart }

    private _gmtOffset: number
    public get gmtOffset() { return this._gmtOffset }

    private _location: string
    public get location() { return this._location }

    private _meetingCode: string
    public get meetingCode() { return this._meetingCode }

    private _meetingKey: number
    public get meetingKey() { return this._meetingKey }

    private _meetingName: string
    public get meetingName() { return this._meetingName }

    private _meetingOfficialName: string
    public get meetingOfficialName() { return this._meetingOfficialName }

    private _year: number
    public get year() { return this._year }

    private constructor(data: IMeeting) {
        this._circuitKey = data.circuitKey
        this._circuitShortName = data.circuitShortName
        this._countryCode = data.countryCode
        this._countryKey = data.countryKey
        this._countryName = data.countryName
        this._dateStart = data.dateStart
        this._gmtOffset = data.gmtOffset
        this._location = data.location
        this._meetingCode = data.meetingCode
        this._meetingKey = data.meetingKey
        this._meetingName = data.meetingName
        this._meetingOfficialName = data.meetingOfficialName
        this._year = data.year
    }

    public static fromJS(data: any): Meeting {
        return new Meeting({
            circuitKey: data[MeetingProperties.CIRCUIT_KEY],
            circuitShortName: data[MeetingProperties.CIRCUIT_SHORT_NAME],
            countryCode: data[MeetingProperties.COUNTRY_CODE],
            countryKey: data[MeetingProperties.COUNTRY_KEY],
            countryName: data[MeetingProperties.COUNTRY_NAME],
            dateStart: DateTimeParser.parseDate(data[MeetingProperties.DATE_START]),
            gmtOffset: data[MeetingProperties.GMT_OFFSET],
            location: data[MeetingProperties.LOCATION],
            meetingCode: data[MeetingProperties.MEETING_CODE],
            meetingKey: data[MeetingProperties.MEETING_KEY],
            meetingName: data[MeetingProperties.MEETING_NAME],
            meetingOfficialName: data[MeetingProperties.MEETING_OFFICIAL_NAME],
            year: data[MeetingProperties.YEAR]
        })
    }
}