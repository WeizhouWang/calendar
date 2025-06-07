using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Calendar.Web.Models
{
    public partial class Country
    {
        [Key]
        [MaxLength(32)]
        public string CountryName { get; set; }
        [MaxLength(16)]
        public string CountryCode { get; set; }
    }
    public partial class CountryState
    {
        [Key]
        public int Id { get; set; }
        public string CountryName { get; set; }
        [ForeignKey("CountryName")]
        public Country Country { get; set; }
        [MaxLength(32)]
        public string State { get; set; }
        [MaxLength(64)]
        public string StateName { get; set; }
    }
    public partial class Holiday
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(32)]
        public string Country { get; set; }
        [MaxLength(32)]
        public string State { get; set; }
        [MaxLength(64)]
        public string HolidayName { get; set; }
        public bool IsSubjectToChange { get; set; }
        [MaxLength(128)]
        public string Comments { get; set; }
        [Column(TypeName = "DateTime")]
        public DateTime Date { get; set; }  //it is local time
    }

}
