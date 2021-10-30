using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class Reservation
    {
        [Key]
        [Required]
        public string ReservationId { get; set; }
        public ReservationStatus Status { get; set; }
        public User User { get; set; }
        public Airline Airline { get; set; }
        public Flight Flight { get; set; }
        public PaymentsAccount PaymentsAccount { get; set; }
    }
}
