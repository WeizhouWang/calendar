using AutoMapper;
using Calendar.Dto;
using Calendar.Web.Models;

namespace Calendar.Web
{
    public class CalendarMapperProfile : Profile
    {
        public CalendarMapperProfile()
        {
            //CreatMmap < source, destination> ()
            CreateMap<Country, CountryDto>();
            CreateMap<CountryState, CountryStateDto>();
            CreateMap<Holiday, HolidayDto>()
                .ForMember(dest => dest.Date, src => src.MapFrom(s => s.Date.ToString("yyyy-MM-dd")));
        }
    }
}
