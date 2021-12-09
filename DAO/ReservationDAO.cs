using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.DAO
{
    public class ReservationDAO
    {
        public string ReservationId { get; set; }
        public int Tickets { get; set; }
        public int Status { get; set; }
        public string FlightId { get; set; }
        public int PaymentsAccountId { get; set; }
    }
}
