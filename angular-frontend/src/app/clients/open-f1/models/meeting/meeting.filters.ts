import { Latest } from "../_common/common.filters"

export interface MeetingFilters {
    circuitKey?: number
    circuitShortName?: string
    countryCode?: string
    countryKey?: number
    countryName?: string
    dateStart?: Date | Latest
    dateStartGt?: Date
    dateStartGte?: Date
    dateStartLt?: Date
    dateStartLte?: Date
    gmtOffset?: number
    location?: string
    meetingCode?: string
    meetingKey?: number | Latest
    meetingName?: string
    meetingOfficialName?: string
    year?: number | Latest
    yearGt?: number
    yearGte?: number
    yearLt?: number
    yearLte?: number
}