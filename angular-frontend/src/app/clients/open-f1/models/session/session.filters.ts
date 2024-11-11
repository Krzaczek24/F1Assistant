import { Latest } from "../_common/common.filters"

export interface SessionFilters {
    circuitKey?: number
    circuitShortName?: string
    countryCode?: string
    countryKey?: number
    countryName?: string
    dateEnd?: Date | Latest
    dateEndGt?: Date
    dateEndGte?: Date
    dateEndLt?: Date
    dateEndLte?: Date
    dateStart?: Date | Latest
    dateStartGt?: Date
    dateStartGte?: Date
    dateStartLt?: Date
    dateStartLte?: Date
    gmtOffset?: number
    location?: string
    meetingKey?: number | Latest
    sessionKey?: number
    sessionName?: string
    sessionType?: string
    year?: number | Latest
    yearGt?: number
    yearGte?: number
    yearLt?: number
    yearLte?: number
}