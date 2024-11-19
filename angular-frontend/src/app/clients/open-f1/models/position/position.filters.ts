import { Latest } from "../_common/common.filters"

export interface PositionFilters {
    date?: Date | Latest
    dateGt?: Date
    dateGte?: Date
    dateLt?: Date
    dateLte?: Date
    driverNumber?: number
    meetingKey?: number | Latest
    position?: number
    sessionKey?: number | Latest
}