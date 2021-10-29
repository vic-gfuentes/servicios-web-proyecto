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
    public class CountriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CountriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<CountriesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Countries.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<CountriesController>/5
        [HttpGet("{id}", Name = "GetCountry")]
        public ActionResult Get(string id)
        {
            try
            {
                var country = _context.Countries.First(ct => ct.CountryId == id);
                return Ok(country);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<CountriesController>
        [HttpPost("{prefix?}")]
        public ActionResult Post( [FromBody] Country country, [FromRoute] string prefix = "CT")
        {
            try
            {
                var consecutive = _context.Consecutives.Single(consec => consec.Prefix == prefix);
                country.CountryId = consecutive.GetConsecutiveCode();
                _context.Countries.Add(country);
                _context.SaveChanges();
                return CreatedAtRoute("GetCountry", new { id = country.CountryId }, country);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<CountriesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Country country)
        {
            try
            {
                if (country.CountryId == id)
                {
                    _context.Entry(country).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetCountry", new { id = country.CountryId }, country);
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

        // DELETE api/<CountriesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                var country = _context.Countries.First(ct => ct.CountryId == id);
                if (country != null)
                {
                    _context.Countries.Remove(country);
                    _context.SaveChanges();
                    return Ok(country);
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
