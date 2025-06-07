import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { CalendarService } from 'src/app/_services/calendar.service';
import { formatDate } from '@angular/common';
import { calendarConstants } from 'src/calendar-constants';
import { map } from "rxjs/operators"
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

    public years = [] as number[];
    public monthNames = [] as string[];
    public weekdayNames = [] as string[];
    public weekNumbers = [] as number[];
    public holidays = [] as fuse.holidayDto[];
    public calendarDates = [] as fuse.calendarDateDto[];
    public country = {} as fuse.countryDto;
    public state = {} as fuse.countryStateDto;
    public countries = [] as fuse.countryDto[];
    public states = [] as fuse.countryStateDto[];
    private countryStates = [] as fuse.countryStateDto[];
    private subscription = {} as Subscription;
    constructor(private calendarService: CalendarService) {
        this.years = [];
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year < currentYear + 2; year++) {
            this.years.push(year);
        }
        this.monthNames = calendarConstants.months;
        this.weekdayNames = calendarConstants.dayOfWeeks;
        this.weekNumbers = [];
        for (let weekNumber = 0; weekNumber < 6; weekNumber++) {
            this.weekNumbers.push(weekNumber);
        }
    }

    ngOnInit(): void {
        const getCountries = this.calendarService.getCountries().pipe(map(res => this.countries = res));
        const getCountryStates = this.calendarService.getCountryStates().pipe(map(res => this.countryStates = res));
        const getHolidays = this.calendarService.getHolidays().pipe(map(res => this.holidays = res));
        this.subscription = combineLatest([getHolidays, getCountries, getCountryStates]).subscribe(() => {
            this.country = this.countries[0];
            this.states = this.countryStates.filter(a => a.countryName === this.country.countryName);
            this.state = this.states[0];
            this.updateCalendar();
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    public countryChanged(): void {
        this.states = this.countryStates.filter(a => a.countryName === this.country.countryName);
        this.state = this.states[0];
        this.updateCalendar();
    }
    public stateChanged(): void {
        this.updateCalendar();
    }

    public updateCalendar(): void {
        this.calendarDates = [];
        this.years.forEach((year) => {
            const daysInTheYear = this.getDaysInTheYear(year);
            for (let i = 1; i <= daysInTheYear; i++) {
                const date = new Date(year, 0, i);
                const month = date.getMonth();
                const dateInMonth = date.getDate();
                const dayOfWeek = date.getDay();
                const weekOfMonth = this.getWeekNumberInMonth(date);
                const holiday = this.holidays.find(a => a.date === formatDate(date, 'yyyy-MM-dd', 'en-au')
                    && (a.country === null || a.country === this.country.countryName) && (a.state === null || a.state === this.state.state));
                const calendarDate = {
                    year,
                    month,
                    monthName: this.monthNames[month],
                    dateInMonth,
                    weekOfMonth,
                    dayOfWeek,
                    isWeekend: dayOfWeek === 0 || dayOfWeek === 6 ? true : false,
                    weekdayName: this.weekdayNames[dayOfWeek],
                    isPublicHoliday: holiday ? true : false,
                    holidayName: holiday?.holidayName,
                    isSubjectToChange: holiday?.isSubjectToChange,
                    comments: holiday?.comments
                } as fuse.calendarDateDto;
                this.calendarDates.push(calendarDate);
            }
        });
    }
    public getCalendarDate(year: number, month: string, weekNumber: number, weekday: string): fuse.calendarDateDto | undefined {
        const calendarDate = this.calendarDates
            .find(a => a.year === year && a.monthName === month && a.weekOfMonth === weekNumber && a.weekdayName === weekday);
        return calendarDate;
    }
    private getDaysInTheYear(year: number): number {
        const firstDayNextYear = new Date(year + 1, 0, 1);
        const firstDayTheYear = new Date(year, 0, 1);
        return (firstDayNextYear.getTime() - firstDayTheYear.getTime()) / (24 * 60 * 60 * 1000);
    }
    private getWeekNumberInMonth(date: Date): number {
        const firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const offsetDate = date.getDate() + firstWeekday - 1;
        return Math.floor(offsetDate / 7);
    }
}

