declare module fuse {
	interface countryDto {
		countryCode: string;
		countryName: string;
	}
	interface countryStateDto {
		countryName: string;
		state: string;
		stateName: string;
	}
	interface holidayDto {
		holidayName: string;
		country: string;
		state: string;
		date: string;
		isSubjectToChange: boolean;
		comments: string;
	}
	interface calendarDateDto {
		year: number;
		month: number;
		monthName: string;
		dateInMonth: number;
		weekOfMonth: number;
		dayOfWeek: number;
		isWeekend: boolean;
		weekdayName: string;
		isPublicHoliday: boolean;
		holidayName: string;
		isSubjectToChange: boolean;
		isSpecialDay: boolean;
		specialDayComments: string;
		comments: string;
		tooltip: string;
		calendarDayClass: string;
	}
}
