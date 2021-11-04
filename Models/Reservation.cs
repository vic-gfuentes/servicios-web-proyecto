using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class Reservation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string ReservationId { get; set; }
        public int Tickets { get; set; }
        public ReservationStatus Status { get; set; }
        public Flight Flight { get; set; }
        public PaymentsAccount PaymentsAccount { get; set; }
    }
}
