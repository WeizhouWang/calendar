using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calendar.Dto
{
    public class CountryDto
    {
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
    }
    public class CountryStateDto
    {
        public string CountryName { get; set; }
        public string State { get; set; }
        public string StateName { get; set; }
    }
    public class HolidayDto
    {
        public string HolidayName { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Date { get; set; }
        public bool IsSubjectToChange { get; set; }
        public string Comments { get; set; }
    }
    public class CalendarDateDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public string MonthName { get; set; }
        public int DateInMonth { get; set; }
        public int WeekOfMonth { get; set; }
        public int DayOfWeek { get; set; }
        public bool IsWeekend { get; set; }
        public string WeekdayName { get; set; }
        public bool IsPublicHoliday { get; set; }
        public string HolidayName { get; set; }
        public bool IsSubjectToChange { get; set; }
        public bool IsSpecialDay { get; set; }
        public string SpecialDayComments { get; set; }
        public string Comments { get; set; }
        public string Tooltip { get; set; }
        public string CalendarDayClass { get; set; }
    }
}
