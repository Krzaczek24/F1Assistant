import { LeaderboardRecord } from "../models/leaderboard-record.model"
import { Driver } from "../clients/open-f1/models/driver/driver.model"

export class LeaderboardManager {
    private leaderboard: LeaderboardRecord[] = []
    
    constructor(drivers: Driver[]) {
        this.setupLeaderboard(drivers)
    }

    public getLeaderboard(): LeaderboardRecord[] {
        return this.leaderboard
    }

    public applyChanges(changes: { driverNumber: number, position: number }[]) {
        let anyChange = false

        changes.forEach(change => {
            const index = this.leaderboard.findIndex(record => record.driver.driverNumber === change.driverNumber)
            if (change.position - 1 !== index) {
                const record = this.leaderboard.splice(index, 1)[0]
                this.leaderboard.splice(change.position - 1, 0, record)
                anyChange = true
            }
        })

        if (anyChange) {
            this.updateDriverPositions()
        }
    }

    private setupLeaderboard(drivers: Driver[]) {
        let index = 1
        drivers.forEach(driver => {
            if (!this.leaderboard.some(x => x.driver.driverNumber === driver.driverNumber)) {
                this.leaderboard.push(new LeaderboardRecord(driver, index++))
            }
        })
    }

    private updateDriverPositions() {
        this.leaderboard.forEach((record, index) => record.position = index + 1)
    }
}