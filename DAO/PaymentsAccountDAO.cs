using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.DAO
{
    public class PaymentsAccountDAO
    {
        public int PaymentsAccountId { get; set; }
        public string AccountNumber { get; set; }
        public PaymentType Type { get; set; }
        public int CVV { get; set; }
        public string AccountPassword { get; set; }
        public int UserId { get; set; }
    }
}
