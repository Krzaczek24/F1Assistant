import { Latest } from "../_common/common.filters"

export interface TeamRadioFilters {
    date?: Date | Latest
    dateGt?: Date
    dateGte?: Date
    dateLt?: Date
    dateLte?: Date
    driverNumber?: number
    meetingKey?: number | Latest
    sessionKey?: number | Latest
}