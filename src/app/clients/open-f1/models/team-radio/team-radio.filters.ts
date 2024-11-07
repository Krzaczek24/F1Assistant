import { Latest } from "../_common/common.filters"

export interface TeamRadioFilters {
    dateGreaterThan?: Date
    driverNumber?: number
    meetingKey?: number | Latest
    sessionKey?: number | Latest
}