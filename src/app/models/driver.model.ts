export interface IDriver {
    driverNumber: number
    fullName: string
}

export class Driver implements IDriver {
    private _driverNumber: number
    public get driverNumber() {
        return this._driverNumber
    }

    private _fullName: string
    public get fullName() {
        return this._fullName
    }

    private constructor(data: IDriver) {
        const { driverNumber, fullName } = data
        this._driverNumber = driverNumber
        this._fullName = fullName
    }

    public static fromJS(data: any): Driver {
        data = typeof data === 'object' ? data : {}
        return new Driver({
            driverNumber: data["driver_number"],
            fullName: data["full_name"]
        })
    }
}