using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class Flight
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Required]
        public string FlightId { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime Date { get; set; }
        public FlightStatus Status { get; set; }
        public Port Port { get; set; }
        public Airline Airline { get; set; }
    }
}
