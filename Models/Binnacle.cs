using servicios_web_proyecto.Context;
using servicios_web_proyecto.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Models
{
    public class Binnacle
    {
        [Key]
        public int RecordId { get; set; }
        public BinnacleType Type { get; set; }
        public string Log { get; set; }

        public static void LogRecord(AppDbContext context, string action, object target)
        {
            var log = new Binnacle();
            var obj = JsonSerializer.Serialize(target);

            switch(action)
            {
                case "error":
                    log.Log = $"Error with: {obj}";
                    log.Type = BinnacleType.Error;
                    context.Binnacles.Add(log);
                    context.SaveChanges();
                    break;
                case "add":
                    log.Log = $"Added: {obj}";
                    log.Type = BinnacleType.Add;
                    context.Binnacles.Add(log);
                    break;
                case "update":
                    log.Log = $"Updated: {obj}";
                    log.Type = BinnacleType.Update;
                    context.Binnacles.Add(log);
                    context.SaveChanges();
                    break;
                case "delete":
                    log.Log = $"Deleted: {obj}";
                    log.Type = BinnacleType.Delete;
                    context.Binnacles.Add(log);
                    context.SaveChanges();
                    break;
                default:
                    break;
            }

        }
    }
}
