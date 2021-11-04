using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class Airline
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string AirlineId { get; set; }
        public string Name { get; set; }
        public Country Country { get; set; }
        public List<Port> Ports { get; set; }
    }
}
