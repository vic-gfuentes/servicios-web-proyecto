using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class Consecutive
    {
        [Key]
        public int ConsecutiveId { get; set; }
        public string Name { get; set; }
        public string Prefix { get; set; }
        public int Value { get; set; }

        public string GetConsecutiveCode()
        {
            var consecutiveCode = "";

            if (Prefix != "")
                consecutiveCode += $"{Prefix}-";

            consecutiveCode += Value.ToString();
            Value += 1;

            return consecutiveCode;
        }

    }
}
