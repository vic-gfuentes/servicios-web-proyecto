using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class Port
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string PortId { get; set; }
        public int Number { get; set; }
        public bool Available { get; set; }
        public PortType Type { get; set; }
        public Airline Airline { get; set; }
    }
}
