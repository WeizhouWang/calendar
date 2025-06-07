import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    private baseUrl: string;
    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.applicationURI;
    }
    public getCountries(): Observable<fuse.countryDto[]> {
        return this.httpClient.get(this.baseUrl + '/api/calendar/countries') as Observable<fuse.countryDto[]>;
    }
    public getCountryStates(): Observable<fuse.countryStateDto[]> {
        return this.httpClient.get(this.baseUrl + '/api/calendar/countryStates') as Observable<fuse.countryStateDto[]>;
    }
    public getHolidays(): Observable<fuse.holidayDto[]> {
        return this.httpClient.get(this.baseUrl + '/api/calendar/holidays') as Observable<fuse.holidayDto[]>;
    }
}
