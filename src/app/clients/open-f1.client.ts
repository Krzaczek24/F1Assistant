import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, mergeMap, Observable, of, throwError } from "rxjs"
import { Driver } from "../models/driver.model"

const API_URL = 'https://api.openf1.org/v1'

const options: any = {
    observe: "response",
    responseType: "blob",
    headers: new HttpHeaders({
        "Accept": "text/plain"
    })
}

type method = "get" | "post" | "put" | "patch"

@Injectable({providedIn: 'root'})
export class OpenF1Client {
    constructor(private client: HttpClient) {

    }

    public getDrivers(): Observable<Driver[]> {
        return this.makeRequest<Driver>("get", "/drivers", Driver.fromJS)
    }

    private makeRequest<T>(method: method, endpoint: string, parser: (response: any) => T): Observable<T[]> {
        return this.client.request(method, API_URL + endpoint, options)
            .pipe(mergeMap((response: any) => parseResponse(response, parser)))
            .pipe(catchError((response: any) => parseError(response, parser)))
    }
}

function parseResponse<T>(response: any, parser: (response: any) => T) {
    console.log(response)

    const status = response.status
    const responseBlob = response instanceof HttpResponse ? response.body : (response.error instanceof Blob ? response.error : undefined)

    return blobToText(responseBlob).pipe(mergeMap((responseText: string) => {
        if (status < 200 || status >= 300) {
            return throwException("An unexpected server error occurred.", status, responseText)
        }

        let result: any = null
        let resultData = responseText === "" ? null : JSON.parse(responseText)
        if (Array.isArray(resultData)) {
            result = []
            for (let item of resultData) {
                result.push(parser(item))
            }
        } else {
            result = parser(resultData)
        }
        return of(result)
    }))
}

function parseError<T>(response: any, parser: (response: any) => T) {
    if (response instanceof HttpResponseBase) {
        try {
            return parseResponse(response, parser)
        } catch (e) {
            return throwError(() => e) as any as Observable<T>
        }
    }
    return throwError(() => response) as any as Observable<T>
}

function numberToString(number: number): string {
    return number.toString().padStart(2, '0')
}

function formatDate(date: Date): string {
    return date.getFullYear() + '-' + numberToString(date.getMonth() + 1) + '-' + numberToString(date.getDate())
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("")
            observer.complete()
            return
        }

        let reader = new FileReader()
            reader.onload = event => {
                observer.next((event.target as any).result)
                observer.complete();
            }
            reader.readAsText(blob)
    })
}

export class ApiException extends Error {
    override message: string
    status: number
    response: string

    constructor(message: string, status: number, response: string) {
        super()

        this.message = message
        this.status = status
        this.response = response
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string): Observable<any> {
    return throwError(() => new ApiException(message, status, response));
}