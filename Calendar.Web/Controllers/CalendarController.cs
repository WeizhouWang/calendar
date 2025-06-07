using AutoMapper;
using Calendar.Dto;
using Calendar.Web.Data;
using Calendar.Web.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace Calendar.Web.Controllers
{
    [Route("api/[controller]")]
    public class CalendarController : Controller
    {
        private readonly ILogger<CalendarController> _logger;
        private readonly IMapper _mapper;
        public CalendarController(ILogger<CalendarController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("countries")]
        public List<CountryDto> GetCountries()
        {
            try
            {
                var countries = JsonConvert.DeserializeObject<List<Country>>(CountryData.CountryJson);
                return _mapper.Map<List<CountryDto>>(countries);
            }
            catch (Exception ex)
            {
                _logger.LogError(new Exception(MethodBase.GetCurrentMethod().DeclaringType.FullName), ex.Message);
                return null;
            }
        }
        [HttpGet("countryStates")]
        public List<CountryStateDto> GetCountryStates()
        {
            try
            {
                var countryStates = JsonConvert.DeserializeObject<List<CountryState>>(CountryStateData.CountryStateJson);
                return _mapper.Map<List<CountryStateDto>>(countryStates);
            }
            catch (Exception ex)
            {
                _logger.LogError(new Exception(MethodBase.GetCurrentMethod().DeclaringType.FullName), ex.Message);
                return null;
            }
        }

        [HttpGet("holidays")]
        public List<HolidayDto> GetHolidays()
        {
            try
            {
                var fileName = Path.Combine(AppContext.BaseDirectory, "Data", "HolidayData.json");
                using (StreamReader fileReader = new StreamReader(fileName))
                {
                    string countryDataJson = fileReader.ReadToEnd();
                    var holidays = JsonConvert.DeserializeObject<List<Holiday>>(countryDataJson);
                    return _mapper.Map<List<HolidayDto>>(holidays);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(new Exception(MethodBase.GetCurrentMethod().DeclaringType.FullName), ex.Message);
                return null;
            }
        }
    }
}