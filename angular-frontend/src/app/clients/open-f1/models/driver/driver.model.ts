import { IDriver } from "./driver.interface"
import { DriverProperties } from "./driver.properties"

export class Driver implements IDriver {
    private _broadcastName: string
    public get broadcastName() { return this._broadcastName }

    private _countryCode: string
    public get countryCode() { return this._countryCode }

    private _driverNumber: number
    public get driverNumber() { return this._driverNumber }

    private _firstName: string
    public get firstName() { return this._firstName }

    private _fullName: string
    public get fullName() { return this._fullName }

    private _headshotUrl: string
    public get headshotUrl() { return this._headshotUrl }

    private _lastName: string
    public get lastName() { return this._lastName }

    private _meetingKey: number
    public get meetingKey() { return this._meetingKey }

    private _nameAcronym: string
    public get nameAcronym() { return this._nameAcronym }

    private _sessionKey: number
    public get sessionKey() { return this._sessionKey }

    private _teamColour: string
    public get teamColour() { return this._teamColour }

    private _teamName: string
    public get teamName() { return this._teamName }

    private constructor(data: IDriver) {
        this._broadcastName = data.broadcastName
        this._countryCode = data.countryCode
        this._driverNumber = data.driverNumber
        this._firstName = data.firstName
        this._fullName = data.fullName
        this._headshotUrl = data.headshotUrl
        this._lastName = data.lastName
        this._meetingKey = data.meetingKey
        this._nameAcronym = data.nameAcronym
        this._sessionKey = data.sessionKey
        this._teamColour = data.teamColour
        this._teamName = data.teamName
    }

    public static fromJS(data: any): Driver {
        return new Driver({
            broadcastName: data[DriverProperties.BROADCAST_NAME],
            countryCode: data[DriverProperties.COUNTRY_CODE],
            driverNumber: data[DriverProperties.DRIVER_NUMBER],
            firstName: data[DriverProperties.FIRST_NAME],
            fullName: data[DriverProperties.FULL_NAME],
            headshotUrl: data[DriverProperties.HEADSHOT_URL],
            lastName: data[DriverProperties.LAST_NAME],
            meetingKey: data[DriverProperties.MEETING_KEY],
            nameAcronym: data[DriverProperties.NAME_ACRONYM],
            sessionKey: data[DriverProperties.SESSION_KEY],
            teamColour: data[DriverProperties.TEAM_COLOUR],
            teamName: data[DriverProperties.TEAM_NAME],
        })
    }
}