using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.DAO
{
    public class FlightDAO
    {
        public string FlightId { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public double TicketPrice { get; set; }
        public DateTime Date { get; set; }
        public FlightStatus Status { get; set; }
        public string PortId { get; set; }
    }
}
