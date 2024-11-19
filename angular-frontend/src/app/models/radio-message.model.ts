import { TeamRadio } from "../clients/open-f1/models/team-radio/team-radio.model"
import { guid } from "../tools/guid.tools"

export class RadioMessage {
    private _date: Date
    public get date() { return this._date }

    private _guid: string
    public get guid() { return this._guid }

    private _isPlaying: boolean
    public get isPlaying() { return this._isPlaying }

    private _listened: boolean
    public get listened() { return this._listened }

    private _recordingUrl: string
    public get recordingUrl() { return this._recordingUrl }

    constructor(teamRadio: TeamRadio, listened: boolean) {
        const { date, recordingUrl } = teamRadio
        this._date = date
        this._recordingUrl = recordingUrl
        this._isPlaying = false
        this._listened = listened
        this._guid = guid()
    }

    public setListened() {
        this._isPlaying = false
        this._listened = true
    }

    public setUnlistened() {
        this._listened = false
    }

    public setPaused() {
        this._isPlaying = false
    }

    public setPlaying() {
        this._isPlaying = true
    }
}