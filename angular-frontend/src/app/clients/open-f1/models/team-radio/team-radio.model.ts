import { DateTimeParser } from "../../tools/datetime-parser"
import { ITeamRadio } from "./team-radio.interface"
import { TeamRadioProperties } from "./team-radio.properties"

export class TeamRadio implements ITeamRadio {
    private _date: Date
    public get date() { return this._date }

    private _driverNumber: number
    public get driverNumber() { return this._driverNumber }

    private _meetingKey: number
    public get meetingKey() { return this._meetingKey }

    private _recordingUrl: string
    public get recordingUrl() { return this._recordingUrl }

    private _sessionKey: number
    public get sessionKey() { return this._sessionKey }

    private constructor(data: ITeamRadio) {
        this._date = data.date
        this._driverNumber = data.driverNumber
        this._meetingKey = data.meetingKey
        this._recordingUrl = data.recordingUrl
        this._sessionKey = data.sessionKey
    }

    public static fromJS(data: any): TeamRadio {
        return new TeamRadio({
            date: DateTimeParser.parseDate(data[TeamRadioProperties.DATE]),
            driverNumber: data[TeamRadioProperties.DRIVER_NUMBER],
            meetingKey: data[TeamRadioProperties.MEETING_KEY],
            recordingUrl: data[TeamRadioProperties.RECORDING_URL],
            sessionKey: data[TeamRadioProperties.SESSION_KEY],
        })
    }
}