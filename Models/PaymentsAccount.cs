using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class PaymentsAccount
    {
        [Key]
        public int PaymentsAccountId { get; set; }
        [Encrypted]
        public string AccountNumber { get; set; }
        public PaymentType Type { get; set; }
        [Encrypted]
        public int? CVV { get; set; }
        [Encrypted]
        public string? AccountPassword { get; set; }
        public User User { get; set; }

    }
}
