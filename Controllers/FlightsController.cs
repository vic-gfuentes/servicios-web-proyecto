using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FlightsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<FlightsController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Flights.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<FlightsController>/5
        [HttpGet("{id}", Name = "GetFlight")]
        public ActionResult Get(string id)
        {
            try
            {
                var flights = _context.Flights.First(ct => ct.FlightId == id);
                return Ok(flights);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<FlightsController>
        [HttpPost("{prefix?}")]
        public ActionResult Post([FromBody] Flight flight, [FromRoute] string prefix = "CT")
        {
            try
            {
                var consecutive = _context.Consecutives.Single(consec => consec.Prefix == prefix);
                flight.FlightId = consecutive.GetConsecutiveCode();
                _context.Flights.Add(flight);
                _context.SaveChanges();
                return CreatedAtRoute("GetFlight", new { id = flight.FlightId }, flight);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<FlightsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Flight flight)
        {
            try
            {
                if (flight.FlightId == id)
                {
                    _context.Entry(flight).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetFlight", new { id = flight.FlightId }, flight);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<FlightsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                var flight = _context.Flights.First(ct => ct.FlightId == id);
                if (flight != null)
                {
                    _context.Flights.Remove(flight);
                    _context.SaveChanges();
                    return Ok(flight);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
