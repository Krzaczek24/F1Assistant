import { Driver } from "../clients/open-f1/models/driver/driver.model"

export class LeaderboardRecord {
    private _driver: Driver
    public get driver() { return this._driver }
    
    private _positions: number[]

    public get allPositions() { return this._positions }
    public get position() { return this._positions.at(-1)! }
    public get highestPosition() { return Math.max(...this._positions) }
    public get initialPosition() { return this._positions.at(0) }
    public get lowestPosition() { return Math.min(...this._positions) }

    public set position(value) { this._positions.push(value) }

    constructor(driver: Driver, position: number) {
        this._driver = driver
        this._positions = [position]
    }
}