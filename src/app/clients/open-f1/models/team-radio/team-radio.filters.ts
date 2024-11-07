import { Latest } from "../_common/common.filters"

export interface TeamRadioFilters {
    date?: Date
    driverNumber?: number
    meetingKey?: number | Latest
    sessionKey?: number | Latest
}