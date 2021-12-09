using Microsoft.AspNetCore.Mvc;
using servicios_web_proyecto.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiltersController : ControllerBase
    {

        private readonly AppDbContext _context;

        public FiltersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("flights")]
        public ActionResult FilterFlights(string origen = "LoadOrigin", string destino = "LoadDestination")
        {
            try
            {
                var flight = _context.Flights.FirstOrDefault(flt => flt.Origin == origen || flt.Destination == destino);

                if (flight != null)
                {
                    var result = new[] { flight };
                    return Ok(result);
                }
                else
                {
                    return Ok(_context.Flights.ToList());
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       
    }
}
