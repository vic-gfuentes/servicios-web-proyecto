using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.DAO
{
    public class PortDAO
    {
        public string PortId { get; set; }
        public int Number { get; set; }
        public bool Available { get; set; }
        public string AirlineId { get; set; }
    }
}
