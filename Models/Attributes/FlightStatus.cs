using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models.Attributes
{
    public enum FlightStatus
    {
        Cancelled = 0,
        Departed = 1,
        Arrived = 2,
        Late = 3,
        Scheduled = 4
    }
}
