using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.DAO;
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
                return Ok(_context.Airlines.Include(c => c.Country).ToList());
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
                var airline = _context.Airlines.Include(c => c.Country).First(ct => ct.AirlineId == id);
                return Ok(airline);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<AirlinesController>
        [HttpPost("{prefix?}")]
        public ActionResult Post([FromBody] AirlineDAO airlineDAO, [FromRoute] string prefix = "CT")
        {
            try
            {
                var airline = new Airline();
                var country = _context.Countries.Single(item => item.CountryId == airlineDAO.CountryId);
                var consecutive = _context.Consecutives.Single(consec => consec.Prefix == prefix);

                airline.AirlineId = consecutive.GetConsecutiveCode();
                airline.Name = airlineDAO.Name;
                airline.Country = country;

                _context.Airlines.Add(airline);
                _context.SaveChanges();
                Binnacle.LogRecord(_context, "add", airline);

                return CreatedAtRoute("GetAirline", new { id = airline.AirlineId }, airline);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<AirlinesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] AirlineDAO airlineDAO)
        {
            try
            {
                if (airlineDAO.AirlineId == id)
                {
                    var airline = _context.Airlines.Single(item => item.AirlineId == airlineDAO.AirlineId);
                    var country = _context.Countries.Single(item => item.CountryId == airlineDAO.CountryId);

                    airline.Name = airlineDAO.Name;
                    airline.Country = country;

                    _context.Entry(airline).State = EntityState.Modified;
                    _context.SaveChanges();
                    Binnacle.LogRecord(_context, "update", airline);

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
                    Binnacle.LogRecord(_context, "delete", airline);

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
