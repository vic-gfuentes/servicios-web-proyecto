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
    public class AirlinesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AirlinesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<AirlinesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Airlines.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<AirlinesController>/5
        [HttpGet("{id}", Name = "GetAirline")]
        public ActionResult Get(string id)
        {
            try
            {
                var airline = _context.Airlines.First(ct => ct.AirlineId == id);
                return Ok(airline);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<AirlinesController>
        [HttpPost("{prefix?}")]
        public ActionResult Post([FromBody] Airline Airline, [FromRoute] string prefix = "CT")
        {
            try
            {
                var consecutive = _context.Consecutives.Single(consec => consec.Prefix == prefix);
                Airline.AirlineId = consecutive.GetConsecutiveCode();
                _context.Airlines.Add(Airline);
                _context.SaveChanges();
                return CreatedAtRoute("GetAirline", new { id = Airline.AirlineId }, Airline);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<AirlinesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Airline airline)
        {
            try
            {
                if (airline.AirlineId == id)
                {
                    _context.Entry(airline).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetAirline", new { id = airline.AirlineId }, airline);
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

        // DELETE api/<AirlinesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                var airline = _context.Airlines.First(ct => ct.AirlineId == id);
                if (airline != null)
                {
                    _context.Airlines.Remove(airline);
                    _context.SaveChanges();
                    return Ok(airline);
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
