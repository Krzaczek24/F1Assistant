import { Latest } from "../_common/common.filters"

export interface DriverFilters {
    driverNumber?: number
    meetingKey?: number | Latest
    sessionKey?: number | Latest
    nameAcronym?: string
    teamName?: string
}