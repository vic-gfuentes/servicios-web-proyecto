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
    public class ConsecutivesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConsecutivesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<ConsecutivesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Consecutives.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ConsecutivesController>/5
        [HttpGet("{id}", Name = "GetConsecutive")]
        public ActionResult Get(int id)
        {
            try
            {
                var consecutive = _context.Consecutives.First(consec => consec.ConsecutiveId == id);
                return Ok(consecutive);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<ConsecutivesController>
        [HttpPost]
        public ActionResult Post([FromBody] Consecutive consecutive)
        {
            try
            {
                _context.Consecutives.Add(consecutive);
                _context.SaveChanges();
                return CreatedAtRoute("GetConsecutive", new { id = consecutive.ConsecutiveId }, consecutive);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ConsecutivesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Consecutive consecutive)
        {
            try
            {
                if (consecutive.ConsecutiveId == id)
                {
                    _context.Entry(consecutive).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetConsecutive", new { id = consecutive.ConsecutiveId }, consecutive);
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

        // DELETE api/<ConsecutivesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var consecutive = _context.Consecutives.First(consec => consec.ConsecutiveId == id);
                if (consecutive != null)
                {
                    _context.Consecutives.Remove(consecutive);
                    _context.SaveChanges();
                    return Ok(id);
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
