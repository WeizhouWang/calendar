import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarService } from 'src/app/_services/calendar.service';
import { MaterialModule } from 'src/app/_core/material/material.module';
import { CalendarComponent } from './calendar.component';
import { By } from '@angular/platform-browser';
import { PipeModule } from 'src/app/_pipes/pipe.module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let mockCalendarService: jasmine.SpyObj<CalendarService>;
  const holidays = [{
    holidayName: 'New Year Day',
    country: null,
    state: null,
    date: '2021-01-01'
  }, {
    holidayName: 'WA Day',
    country: 'Australia',
    state: 'WA',
    date: '2021-06-07'
  }, {
    holidayName: 'Labor Day',
    country: 'Australia',
    state: 'SA',
    date: '2021-10-04'
  }] as fuse.holidayDto[];
  const countries = [{
    countryName: 'Australia',
    countryCode: ''
  }, {
    countryName: 'New Zealand',
    countryCode: ''
  }] as fuse.countryDto[];
  const countryStates = [{
    countryName: 'Australia',
    state: 'WA',
    stateName: 'West Australia'
  }, {
    countryName: 'Australia',
    state: 'SA',
    stateName: 'South Australia'
  }] as fuse.countryStateDto[]
  beforeEach(async () => {
    mockCalendarService = jasmine.createSpyObj(['getHolidays', 'getCountries', 'getCountryStates']);
    mockCalendarService.getHolidays.and.returnValue(of(holidays));
    mockCalendarService.getCountries.and.returnValue(of(countries));
    mockCalendarService.getCountryStates.and.returnValue(of(countryStates));
    await TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
      ],
      imports: [
        MaterialModule,
        PipeModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CalendarService, useValue: mockCalendarService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    void expect(component).toBeTruthy();
  });
  it('should display 2 years calendar', (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const queryYears = fixture.debugElement.queryAll(By.css('.calendar-year'));
      expect(queryYears.length).toBe(2);
      const queryMonths = fixture.debugElement.queryAll(By.css('.calendar-month'));
      expect(queryMonths.length).toBe(24);
      done();
    });
  });
  it('first year is current year', (done) => {
    let currentYear = new Date().getFullYear();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const queryYears = fixture.debugElement.queryAll(By.css('.calendar-year .mat-mdc-card-title'));
      expect(queryYears[0].nativeElement.textContent).toBe(currentYear.toString());
      done();
    });
  });
  it('first year has 365/366 days', (done) => {
    let currentYear = new Date().getFullYear();
    let isLeapYear = false;
    if ((currentYear % 4 == 0 && currentYear % 100 != 0) || (currentYear % 400 == 0)) {
      isLeapYear = true;
    }
    let dayNumber = isLeapYear ? 366 : 365;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const queryYears = fixture.debugElement.queryAll(By.css('.calendar-year'));
      const queryDays = queryYears[0].queryAll(By.css('.calendar-day'));
      expect(queryDays.length).toBe(dayNumber);
      done();
    });
  });
  it('next year has 365/366 days', (done) => {
    let nextYear = new Date().getFullYear() + 1;
    let isLeapYear = false;
    if ((nextYear % 4 == 0 && nextYear % 100 != 0) || (nextYear % 400 == 0)) {
      isLeapYear = true;
    }
    let dayNumber = isLeapYear ? 366 : 365;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const queryYears = fixture.debugElement.queryAll(By.css('.calendar-year'));
      const queryDays = queryYears[1].queryAll(By.css('.calendar-day'));
      expect(queryDays.length).toBe(dayNumber);
      done();
    });
  });
  it('Australia has states', (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const countryElement: HTMLSelectElement = fixture.debugElement.query(By.css('#country')).nativeElement;
      countryElement.click();
      fixture.detectChanges();
      const countryOptions = fixture.debugElement.queryAll(By.css('mat-option'));
      const countryOption = countryOptions.find(a => a.nativeElement.innerText.includes('Australia'));
      expect(countryOption).not.toBeUndefined();
      done();
    });
  });
});
