using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        [Encrypted]
        public string Password { get; set; }
        public UserRole Role { get; set; }
        public List<PaymentsAccount> PaymentsAccounts { get; set; }
    }
}
