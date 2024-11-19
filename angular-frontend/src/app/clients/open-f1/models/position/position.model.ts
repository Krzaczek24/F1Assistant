import { DateTimeParser } from "../../tools/datetime-parser"
import { IPosition } from "./position.interface"
import { PositionProperties } from "./position.properties"

export class Position implements IPosition {
    private _date: Date
    public get date() { return this._date }

    private _driverNumber: number
    public get driverNumber() { return this._driverNumber }

    private _meetingKey: number
    public get meetingKey() { return this._meetingKey }

    private _position: number
    public get position() { return this._position }

    private _sessionKey: number
    public get sessionKey() { return this._sessionKey }

    private constructor(data: IPosition) {
        this._date = data.date
        this._driverNumber = data.driverNumber
        this._meetingKey = data.meetingKey
        this._position = data.position
        this._sessionKey = data.position
    }

    public static fromJS(data: any): Position {
        return new Position({
            date: DateTimeParser.parseDate(data[PositionProperties.DATE]),
            driverNumber: data[PositionProperties.DRIVER_NUMBER],
            meetingKey: data[PositionProperties.MEETING_KEY],
            position: data[PositionProperties.POSITION],
            sessionKey: data[PositionProperties.SESSION_KEY]
        })
    }
}